package com.thepizzabox.ui.menu;

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
public final class MenuViewModel_Factory implements Factory<MenuViewModel> {
  private final Provider<MenuRepository> menuRepositoryProvider;

  public MenuViewModel_Factory(Provider<MenuRepository> menuRepositoryProvider) {
    this.menuRepositoryProvider = menuRepositoryProvider;
  }

  @Override
  public MenuViewModel get() {
    return newInstance(menuRepositoryProvider.get());
  }

  public static MenuViewModel_Factory create(Provider<MenuRepository> menuRepositoryProvider) {
    return new MenuViewModel_Factory(menuRepositoryProvider);
  }

  public static MenuViewModel newInstance(MenuRepository menuRepository) {
    return new MenuViewModel(menuRepository);
  }
}
