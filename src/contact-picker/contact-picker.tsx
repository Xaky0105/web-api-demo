import { useState, useEffect } from "react";
import styles from "./contact-picker.module.css";

type NavigatorWithContacts = Navigator & {
  contacts: {
    select: (
      fields: string[],
      options: { multiple: boolean }
    ) => Promise<Contact[]>;
    getProperties: () => Promise<string[]>;
  };
};

type Contact = {
  name?: string[];
  email?: string[];
  tel?: string[];
  address?: any[];
  icon?: Blob[];
};

export const ContactPicker = () => {
  const [isMultiple, setIsMultiple] = useState(false);
  const [supportedProperties, setSupportedProperties] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isSupported = "contacts" in navigator && "ContactsManager" in window;

  useEffect(() => {
    checkProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Вызывается при первом рендере и устанавливает в состояния поддерживаемые типы контактов
  const checkProperties = async () => {
    if (!isSupported) {
      return;
    }

    try {
      const contactsManager = (navigator as NavigatorWithContacts).contacts;
      const properties = await contactsManager.getProperties();
      setSupportedProperties(properties);
    } catch {
      setError("Error getting supported properties.");
    }
  };

  const toggleProperty = (property: string) => {
    if (selectedProperties.includes(property)) {
      setSelectedProperties(selectedProperties.filter((p) => p !== property));
    } else {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  //Функция вызывается при клике и открывает модальное окно с контактами
  const getContacts = async () => {
    if (!isSupported) {
      console.log("Not supported");
      return;
    }

    const opts = { multiple: isMultiple };

    try {
      const contactsManager = (navigator as NavigatorWithContacts).contacts;

      const contactsSelect = await contactsManager.select(
        selectedProperties,
        opts
      );
      setContacts(contactsSelect);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.contactPicker}>
      <h2>Contact Picker</h2>
      {supportedProperties.map((property, index) => (
        <label key={index} className={styles.propertyCheckbox}>
          <input
            type="checkbox"
            checked={selectedProperties.includes(property)}
            onChange={() => toggleProperty(property)}
          />
          {property}
        </label>
      ))}
      <label className={styles.propertyCheckbox}>
        <input
          type="checkbox"
          checked={isMultiple}
          onChange={() => setIsMultiple(!isMultiple)}
        />
        Multiple Selection
      </label>
      <button className={styles.getContactsButton} onClick={getContacts}>
        Get Contacts
      </button>
      {contacts.length > 0 && (
        <div className={styles.contactList}>
          {contacts.map((contact, index) => (
            <div key={index} className={styles.contact}>
              {contact.name && (
                <p>
                  <b>Name:</b> {contact.name}
                </p>
              )}
              {contact.email && (
                <p>
                  <b>Email:</b> {contact.email}
                </p>
              )}
              {contact.tel && (
                <p>
                  <b>Telephone:</b> {contact.tel}
                </p>
              )}
              {contact.address &&
                contact.address.map((address, addressIndex) => (
                  <p key={addressIndex}>
                    <b>Address:</b> {JSON.stringify(address)}
                  </p>
                ))}
              {contact.icon &&
                contact.icon.map((icon, iconIndex) => (
                  <div key={iconIndex} className={styles.contactIcon}>
                    <b>Icon:</b>
                    <img src={URL.createObjectURL(icon)} alt="Contact Icon" />
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
