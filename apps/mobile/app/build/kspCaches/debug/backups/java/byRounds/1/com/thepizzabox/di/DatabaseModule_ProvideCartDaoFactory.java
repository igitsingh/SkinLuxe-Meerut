package com.thepizzabox.di;

import com.thepizzabox.data.local.AppDatabase;
import com.thepizzabox.data.local.CartDao;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Preconditions;
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
public final class DatabaseModule_ProvideCartDaoFactory implements Factory<CartDao> {
  private final Provider<AppDatabase> databaseProvider;

  public DatabaseModule_ProvideCartDaoFactory(Provider<AppDatabase> databaseProvider) {
    this.databaseProvider = databaseProvider;
  }

  @Override
  public CartDao get() {
    return provideCartDao(databaseProvider.get());
  }

  public static DatabaseModule_ProvideCartDaoFactory create(
      Provider<AppDatabase> databaseProvider) {
    return new DatabaseModule_ProvideCartDaoFactory(databaseProvider);
  }

  public static CartDao provideCartDao(AppDatabase database) {
    return Preconditions.checkNotNullFromProvides(DatabaseModule.INSTANCE.provideCartDao(database));
  }
}
