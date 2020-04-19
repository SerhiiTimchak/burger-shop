import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {ClassicEditor} from '../../hoc/ckeditor/ckeditor5-build-classic/build/ckeditor';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';




class ContactData extends Component {
//   editor = null;
//   componentDidMount(){
//  this.editor = DecoupledEditor
// 	.create( document.querySelector( '#editor' ) )
// 		.then( editor => {
// 			// The toolbar needs to be explicitly appended.
// 			document.querySelector( '#toolbar-container' ).appendChild( editor.ui.view.toolbar.element );
//       window.editor = editor;
//       this.editor = editor
//       // console.log("editor", );
// 		} )
// 	.catch( err => {
// 		console.error( err.stack );
// 	} );
//   }
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal code"
        },
        value: "",
        validation: {
          required: true,
          minlegth: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ukraine"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    // console.log(this.state.orderForm);
    const formData = {};
    for (let formElementIndetifier in this.state.orderForm) {
      formData[formElementIndetifier] = this.state.orderForm[
        formElementIndetifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(error => {});
  };

  

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => {
              this.inputChangedHandler(event, formElement.id);
            }}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h2>Enter your Contact Data</h2>
        {form}
        {/* <div id="toolbar-container"></div>
        <div id="editor"></div> 
        <button onClick={() => { console.log(this.editor.getData())  }}>Get data</button> */}
        <CKEditor
                    editor={ ClassicEditor }
  
                    // editor= { DecoupledEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                />
      </div>
    );
  }
}

export default ContactData;
