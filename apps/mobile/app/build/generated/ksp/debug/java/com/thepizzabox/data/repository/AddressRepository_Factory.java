package com.thepizzabox.data.repository;

import com.thepizzabox.data.remote.ApiService;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;
import javax.inject.Provider;

@ScopeMetadata("javax.inject.Singleton")
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
public final class AddressRepository_Factory implements Factory<AddressRepository> {
  private final Provider<ApiService> apiServiceProvider;

  public AddressRepository_Factory(Provider<ApiService> apiServiceProvider) {
    this.apiServiceProvider = apiServiceProvider;
  }

  @Override
  public AddressRepository get() {
    return newInstance(apiServiceProvider.get());
  }

  public static AddressRepository_Factory create(Provider<ApiService> apiServiceProvider) {
    return new AddressRepository_Factory(apiServiceProvider);
  }

  public static AddressRepository newInstance(ApiService apiService) {
    return new AddressRepository(apiService);
  }
}
