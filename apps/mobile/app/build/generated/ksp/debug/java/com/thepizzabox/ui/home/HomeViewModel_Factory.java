package com.thepizzabox.ui.home;

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
public final class HomeViewModel_Factory implements Factory<HomeViewModel> {
  private final Provider<MenuRepository> menuRepositoryProvider;

  public HomeViewModel_Factory(Provider<MenuRepository> menuRepositoryProvider) {
    this.menuRepositoryProvider = menuRepositoryProvider;
  }

  @Override
  public HomeViewModel get() {
    return newInstance(menuRepositoryProvider.get());
  }

  public static HomeViewModel_Factory create(Provider<MenuRepository> menuRepositoryProvider) {
    return new HomeViewModel_Factory(menuRepositoryProvider);
  }

  public static HomeViewModel newInstance(MenuRepository menuRepository) {
    return new HomeViewModel(menuRepository);
  }
}
