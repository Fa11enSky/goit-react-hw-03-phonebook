import { Component } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  isIncludeContact = name => {
    return this.state.contacts.find(
      el => el.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
  };
  updateContacts = newContact => {
    const { name } = newContact;
    if (this.isIncludeContact(name)) {
      alert(` ${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  handleInput = ev => {
    this.setState({ [ev.target.name]: ev.target.value.toLowerCase() });
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };
  createRenderListContact = () => {
    const { contacts, filter } = this.state;
    let toRender;
    if (filter.length !== 0) {
      toRender = contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      toRender = contacts;
    }
    return toRender;
  };
  render() {
    return (
      <div>
        <h1
          style={{
            fontSize: '45px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Phonebook
        </h1>
        <ContactForm update={this.updateContacts} />
        <h2
          style={{
            fontSize: '40px',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Contacts
        </h2>
        <Filter handleInput={this.handleInput} />
        <ContactList
          contacts={this.createRenderListContact()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
