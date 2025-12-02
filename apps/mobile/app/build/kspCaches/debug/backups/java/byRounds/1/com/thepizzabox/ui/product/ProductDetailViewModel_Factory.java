package com.thepizzabox.ui.product;

import androidx.lifecycle.SavedStateHandle;
import com.thepizzabox.data.repository.CartRepository;
import com.thepizzabox.data.repository.MenuRepository;
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
public final class ProductDetailViewModel_Factory implements Factory<ProductDetailViewModel> {
  private final Provider<MenuRepository> menuRepositoryProvider;

  private final Provider<CartRepository> cartRepositoryProvider;

  private final Provider<SavedStateHandle> savedStateHandleProvider;

  public ProductDetailViewModel_Factory(Provider<MenuRepository> menuRepositoryProvider,
      Provider<CartRepository> cartRepositoryProvider,
      Provider<SavedStateHandle> savedStateHandleProvider) {
    this.menuRepositoryProvider = menuRepositoryProvider;
    this.cartRepositoryProvider = cartRepositoryProvider;
    this.savedStateHandleProvider = savedStateHandleProvider;
  }

  @Override
  public ProductDetailViewModel get() {
    return newInstance(menuRepositoryProvider.get(), cartRepositoryProvider.get(), savedStateHandleProvider.get());
  }

  public static ProductDetailViewModel_Factory create(
      Provider<MenuRepository> menuRepositoryProvider,
      Provider<CartRepository> cartRepositoryProvider,
      Provider<SavedStateHandle> savedStateHandleProvider) {
    return new ProductDetailViewModel_Factory(menuRepositoryProvider, cartRepositoryProvider, savedStateHandleProvider);
  }

  public static ProductDetailViewModel newInstance(MenuRepository menuRepository,
      CartRepository cartRepository, SavedStateHandle savedStateHandle) {
    return new ProductDetailViewModel(menuRepository, cartRepository, savedStateHandle);
  }
}
