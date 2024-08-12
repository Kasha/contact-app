<template>
    <div class="containera">
      <div class="row">
        
      <div class="col s12 l6 xl10">
        <div class="row">
          <Contact
           v-for="contact in contacts" 
           :contact="contact"
           @delete-contact="deleteContact(contact)" 
           @edit-contact="editContact(contact)"
           >
          </Contact>
        </div>
      </div>
  
      <div class="col s12 l6 xl2">
          <div class="card-panel z-depth-1 contact adding">
            <div class="inner teal-text text-lighten-4">
             <i @click="addcontact(contact_item)" class="large material-icons">add_circle_outline</i>
            </div>
          </div>
        </div>
      </div>
      
     <!-- FORM YO Yo -->
    <div v-if="showModal">
      <contact-form 
      :valid = "valid"
      :contact_item="contact_item" 
      :buttonText="buttonText"
      @update-contact="updateContact(contact_item)"
      @cancel-contact="cancelContact(contact_item)"
      ></contact-form>
      </div>
     
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="showModal = false" style="display:flex;alignItems:center;justifyContent:center;height: 60%;">
      </modal>
  
    </div>
  </template>


<script>
import { ContactService } from '@/services/ContactService';
import Contact from "@/components/Contact.vue"
import ContactForm from "@/components/ContactForm.vue"


export default {  
    name: "ContactManager",
    components: { Contact, ContactForm },
    data: function (){
        return{
        contacts : [],
        valid: false,
        showModal: false,
        buttonText: "",
        contact_item: {
                    name : '',
                    img: 'https://img.freepik.com/premium-vector/man-avatar-character-male-portrait-flat-design_532867-538.jpg?w=1060',
                    email : '',
                    phone : '',
                    company : '',
                    skill : '',
                    id : '',
                    address : '',
                    city : '',
                    location : {},
                },
        errorMessage : null
    }
},
    created: function (){

        try {
            let response = ContactService.getAllContacts();
            this.contacts = response;
        }
        catch (error){
            this.errorMessage = error;
        }
    },
    methods: {
        updateLocal() {
            this.contacts = ContactService.getAllContacts() ;
        },
       editContact(contact)
        {
            this.buttonText = "Edit Contact" ;
            this.contact_item = contact ;
            this.showModal = true ;
        },
        cancelContact(contact) {
            this.showModal = false ;
        },
        updateContact : function(contact)
        {
          this.updateSubmit(contact)
        },
        addcontact: function()
        {
            this.buttonText = "Add Contact" ;
            this.contact_item = {
                    name : '',
                    img: 'https://img.freepik.com/premium-vector/man-avatar-character-male-portrait-flat-design_532867-538.jpg?w=125',
                    email : '',
                    phone : '',
                    company : '',
                    skill : '',
                    id : Date.now(),
                    address : '',
                    city : '',
                    location : {},
                }
                this.showModal = true ;
        },
        deleteContact : function(contact)
            {
                try{
                    ContactService.deleteContact(contact.id) ;
                    this.updateLocal()
                }
                catch(error)
                {
                    console.log(error)
                }
            },
        updateSubmit : async function(contact)
            {
                try
                {
                    if( await ContactService.createContact(contact) == true )
                    {
                      this.updateLocal()
                      this.showModal = false ;
                    }
                }
                catch(error)
                {
                    console.log(error)
                }
            },
        }
    }

</script>

<style lang="scss">
body {
  background-color: silver;
}
.modal {
  padding: 15px;
}
.contact {
  position: relative;
  height: 300px;
  &.adding {
    display: table;
    width: 100%;
    text-align: center;
    .inner {
      display: table-cell;
      vertical-align: middle;
    }
  }
  i {
    cursor: pointer;
  }
  h5, h4 {
    font-weight: bold;
    margin: 10px 0;
  }
  h4 {
    font-size: 20px;
  }
  h5 {
    font-size: 16px;
    margin-bottom: 0;
  }
  p {
    margin: 6px 0;
    line-height: 1;
    &.location {
      margin: 10px 0 15px;
      i, span {
        display: inline-block;
        vertical-align: middle;
      }
      i {
        margin-top: -2px;
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
}
.skill {
  display: inline-block;
  line-height: 1;
  font-weight: bold;
  margin-top: 8px;
  font-size: 16px;
}
.buttons-block {
  position: absolute;
  bottom: 10px;
  right: 15px;
  i {
    display: inline-block;
    font-size: 20px;
    margin-left: 3px;
    vertical-align: middle;
  }
}
</style>

