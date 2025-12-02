package com.thepizzabox.ui.checkout;

import com.thepizzabox.data.repository.AddressRepository;
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
public final class AddressViewModel_Factory implements Factory<AddressViewModel> {
  private final Provider<AddressRepository> addressRepositoryProvider;

  public AddressViewModel_Factory(Provider<AddressRepository> addressRepositoryProvider) {
    this.addressRepositoryProvider = addressRepositoryProvider;
  }

  @Override
  public AddressViewModel get() {
    return newInstance(addressRepositoryProvider.get());
  }

  public static AddressViewModel_Factory create(
      Provider<AddressRepository> addressRepositoryProvider) {
    return new AddressViewModel_Factory(addressRepositoryProvider);
  }

  public static AddressViewModel newInstance(AddressRepository addressRepository) {
    return new AddressViewModel(addressRepository);
  }
}
