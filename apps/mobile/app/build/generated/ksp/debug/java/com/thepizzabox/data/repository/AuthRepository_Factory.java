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
public final class AuthRepository_Factory implements Factory<AuthRepository> {
  private final Provider<ApiService> apiServiceProvider;

  public AuthRepository_Factory(Provider<ApiService> apiServiceProvider) {
    this.apiServiceProvider = apiServiceProvider;
  }

  @Override
  public AuthRepository get() {
    return newInstance(apiServiceProvider.get());
  }

  public static AuthRepository_Factory create(Provider<ApiService> apiServiceProvider) {
    return new AuthRepository_Factory(apiServiceProvider);
  }

  public static AuthRepository newInstance(ApiService apiService) {
    return new AuthRepository(apiService);
  }
}
