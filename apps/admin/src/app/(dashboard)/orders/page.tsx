"use client"

export const dynamic = 'force-dynamic';
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Eye, Bike, Bell } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import api from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type OrderItem = {
    id: string
    name: string
    quantity: number
    price: number
    options?: any
    addons?: any
}

type Order = {
    id: string
    orderNumber: number
    user: {
        name: string
        email: string
        phone?: string
    }
    status: "PENDING" | "ACCEPTED" | "PREPARING" | "BAKING" | "READY_FOR_PICKUP" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED"
    total: number
    items: OrderItem[]
    createdAt: string
    paymentMethod: string
    paymentStatus: string
    deliveryPartnerId?: string
    deliveryPartner?: {
        name: string
        phone: string
    }
}

type DeliveryPartner = {
    id: string
    name: string
    status: "AVAILABLE" | "BUSY" | "OFFLINE"
}

const ORDER_STATUSES = [
    { value: "ALL", label: "All Orders" },
    { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "ACCEPTED", label: "Accepted", color: "bg-blue-100 text-blue-800" },
    { value: "PREPARING", label: "Preparing", color: "bg-orange-100 text-orange-800" },
    { value: "BAKING", label: "Baking", color: "bg-orange-200 text-orange-900" },
    { value: "READY_FOR_PICKUP", label: "Ready", color: "bg-purple-100 text-purple-800" },
    { value: "OUT_FOR_DELIVERY", label: "Out for Delivery", color: "bg-indigo-100 text-indigo-800" },
    { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
]

import { Suspense } from "react"

import { useSocketStore } from "@/store/useSocketStore"
import { getSocket } from "@/lib/socket"

function OrdersContent() {
    const searchParams = useSearchParams()
    const statusParam = searchParams.get('status')

    // Map 'active' to show non-delivered orders
    const getInitialFilter = () => {
        if (statusParam === 'active') {
            return 'ACTIVE' // We'll handle this specially
        }
        return statusParam?.toUpperCase() || 'ALL'
    }

    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>(getInitialFilter())
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isAssignPartnerOpen, setIsAssignPartnerOpen] = useState(false)
    const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([])
    const [selectedPartnerId, setSelectedPartnerId] = useState<string>("")

    const { resetNewOrdersCount } = useSocketStore()

    // Sound notification ref
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio("/sounds/notification.mp3")
        fetchOrders()
        fetchDeliveryPartners()
        resetNewOrdersCount() // Reset badge when viewing orders

        // Listen for new orders to refresh list immediately
        const socket = getSocket()
        const handleNewOrder = () => {
            fetchOrders()
        }
        socket.on('new_order', handleNewOrder)

        const interval = setInterval(fetchOrders, 10000) // Poll every 10s as backup

        return () => {
            clearInterval(interval)
            socket.off('new_order', handleNewOrder)
        }
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders")
            setOrders(res.data)
        } catch (error) {
            console.error("Failed to fetch orders", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchDeliveryPartners = async () => {
        try {
            const res = await api.get("/delivery-partners")
            setDeliveryPartners(res.data)
        } catch (error) {
            console.error("Failed to fetch delivery partners", error)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await api.put(`/orders/${id}/status`, { status: newStatus })
            toast.success(`Order status updated to ${newStatus}`)
            fetchOrders()
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const assignPartner = async () => {
        if (!selectedOrder || !selectedPartnerId) return

        try {
            await api.put(`/orders/${selectedOrder.id}/assign-partner`, { deliveryPartnerId: selectedPartnerId })
            toast.success("Delivery partner assigned")
            setIsAssignPartnerOpen(false)
            fetchOrders()
        } catch (error) {
            toast.error("Failed to assign partner")
        }
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `TPB${String(order.orderNumber).padStart(5, '0')}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user.email.toLowerCase().includes(searchQuery.toLowerCase())

        // Handle 'ACTIVE' filter to show all non-delivered orders
        let matchesStatus = false
        if (statusFilter === "ACTIVE") {
            matchesStatus = order.status !== "DELIVERED" && order.status !== "CANCELLED" && order.status !== "PENDING"
        } else {
            matchesStatus = statusFilter === "ALL" || order.status === statusFilter
        }

        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        return ORDER_STATUSES.find(s => s.value === status)?.color || "bg-gray-100 text-gray-800"
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50/50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h2>
                    <p className="text-slate-500 mt-1">Manage and track customer orders.</p>
                </div>
                <Button onClick={fetchOrders} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="ALL" value={statusFilter} onValueChange={setStatusFilter} className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto bg-white p-1 border">
                        {ORDER_STATUSES.map(status => (
                            <TabsTrigger key={status.value} value={status.value} className="min-w-[100px]">
                                {status.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10">Loading...</TableCell>
                            </TableRow>
                        ) : filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10 text-slate-500">No orders found</TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-mono text-xs font-bold text-orange-600">
                                        TPB{String(order.orderNumber).padStart(5, '0')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{order.user.name}</div>
                                        <div className="text-xs text-slate-500">{order.user.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-[300px]">
                                        <div className="text-sm text-slate-700 line-clamp-2">
                                            {order.items.map(i => `${i.name} x${i.quantity}`).join(", ")}
                                        </div>
                                    </TableCell>
                                    <TableCell>{format(new Date(order.createdAt), "MMM d, h:mm a")}</TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`${getStatusColor(order.status)} border-0`}>
                                            {ORDER_STATUSES.find(s => s.value === order.status)?.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {order.deliveryPartner ? (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Bike className="h-4 w-4" />
                                                {order.deliveryPartner.name}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">Unassigned</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedOrder(order)
                                                    setIsDetailsOpen(true)
                                                }}
                                            >
                                                <Eye className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Order Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Order ID: TPB{String(selectedOrder?.orderNumber).padStart(5, '0')}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-semibold text-slate-500">Customer</div>
                                    <div>{selectedOrder.user.name}</div>
                                    <div>{selectedOrder.user.email}</div>
                                    <div>{selectedOrder.user.phone || "No phone"}</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-500">Payment</div>
                                    <div>{selectedOrder.paymentMethod}</div>
                                    <Badge variant={selectedOrder.paymentStatus === "PAID" ? "default" : "secondary"}>
                                        {selectedOrder.paymentStatus}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <div className="font-semibold text-slate-500 mb-2">Items</div>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0">
                                            <div>
                                                <div className="font-medium">{item.name} <span className="text-slate-500">x{item.quantity}</span></div>
                                            </div>
                                            <div>{formatCurrency(item.price * item.quantity)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                                <div className="font-bold text-lg">Total</div>
                                <div className="font-bold text-lg text-orange-600">{formatCurrency(selectedOrder.total)}</div>
                            </div>

                            <div className="pt-4 border-t space-y-4">
                                <div className="font-semibold text-slate-500">Actions</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedOrder.status === "PENDING" && (
                                        <Button onClick={() => updateStatus(selectedOrder.id, "ACCEPTED")} className="bg-blue-500 hover:bg-blue-600">
                                            Accept Order
                                        </Button>
                                    )}
                                    {selectedOrder.status === "ACCEPTED" && (
                                        <Button onClick={() => updateStatus(selectedOrder.id, "PREPARING")} className="bg-yellow-500 hover:bg-yellow-600">
                                            Start Preparing
                                        </Button>
                                    )}
                                    {selectedOrder.status === "PREPARING" && (
                                        <Button onClick={() => updateStatus(selectedOrder.id, "BAKING")} className="bg-orange-500 hover:bg-orange-600">
                                            Start Baking
                                        </Button>
                                    )}
                                    {selectedOrder.status === "BAKING" && (
                                        <Button onClick={() => updateStatus(selectedOrder.id, "READY_FOR_PICKUP")} className="bg-purple-500 hover:bg-purple-600">
                                            Ready for Pickup
                                        </Button>
                                    )}
                                    {selectedOrder.status === "READY_FOR_PICKUP" && (
                                        <Button
                                            onClick={() => {
                                                setIsDetailsOpen(false)
                                                setIsAssignPartnerOpen(true)
                                            }}
                                            className="bg-indigo-500 hover:bg-indigo-600"
                                        >
                                            Assign Delivery Partner
                                        </Button>
                                    )}
                                    {selectedOrder.status === "OUT_FOR_DELIVERY" && (
                                        <Button onClick={() => updateStatus(selectedOrder.id, "DELIVERED")} className="bg-green-500 hover:bg-green-600">
                                            Mark Delivered
                                        </Button>
                                    )}
                                    {selectedOrder.status !== "DELIVERED" && selectedOrder.status !== "CANCELLED" && (
                                        <Button variant="destructive" onClick={() => updateStatus(selectedOrder.id, "CANCELLED")}>
                                            Cancel Order
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Assign Partner Dialog */}
            <Dialog open={isAssignPartnerOpen} onOpenChange={setIsAssignPartnerOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Delivery Partner</DialogTitle>
                        <DialogDescription>
                            Select a delivery partner for order TPB{String(selectedOrder?.orderNumber).padStart(5, '0')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Select value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a partner" />
                            </SelectTrigger>
                            <SelectContent>
                                {deliveryPartners.map(partner => (
                                    <SelectItem
                                        key={partner.id}
                                        value={partner.id}
                                        disabled={partner.status !== "AVAILABLE"}
                                    >
                                        {partner.name} ({partner.status})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAssignPartnerOpen(false)}>Cancel</Button>
                        <Button onClick={assignPartner} disabled={!selectedPartnerId}>Assign Partner</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default function OrdersPage() {
    return (
        <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersContent />
        </Suspense>
    )
}
