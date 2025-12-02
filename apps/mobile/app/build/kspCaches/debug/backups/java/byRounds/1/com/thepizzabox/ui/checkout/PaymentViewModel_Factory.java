package com.thepizzabox.ui.checkout;

import com.thepizzabox.data.local.CartDao;
import com.thepizzabox.data.repository.OrderRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;
import javax.inject.Provider;

@ScopeMetadata
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava"
})
public final class PaymentViewModel_Factory implements Factory<PaymentViewModel> {
  private final Provider<OrderRepository> orderRepositoryProvider;

  private final Provider<CartDao> cartDaoProvider;

  public PaymentViewModel_Factory(Provider<OrderRepository> orderRepositoryProvider,
      Provider<CartDao> cartDaoProvider) {
    this.orderRepositoryProvider = orderRepositoryProvider;
    this.cartDaoProvider = cartDaoProvider;
  }

  @Override
  public PaymentViewModel get() {
    return newInstance(orderRepositoryProvider.get(), cartDaoProvider.get());
  }

  public static PaymentViewModel_Factory create(Provider<OrderRepository> orderRepositoryProvider,
      Provider<CartDao> cartDaoProvider) {
    return new PaymentViewModel_Factory(orderRepositoryProvider, cartDaoProvider);
  }

  public static PaymentViewModel newInstance(OrderRepository orderRepository, CartDao cartDao) {
    return new PaymentViewModel(orderRepository, cartDao);
  }
}
