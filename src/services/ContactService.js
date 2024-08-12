import axios from 'axios'
export class ContactService {
    static contacts = {
       '1519720712926':{  "id": "1519720712926",
            "name": "Janeth Carton",
            "company": "Twitter. inc.",
            "email":"j_carthon@gmail.com",
            "skill": "CEO",
            "phone": "(123)456-7790",
            "img": "/img/janeth_carton.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107'
    },
    '1519720712927':{
            "id": "1519720712927",
            "name": "Alex Jonathan",
            "company": "Twitter. inc.",
            "email":"alexj@gmail.com",
            "skill": "Marketing Manager",
            "phone": "(123)486-7090",
            "img": "/img/alex_jonathan.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107',
    },  
    '1519720712928':{
            "id": "1519720712928",
            "name": "Michael Zimber",
            "company": "Twitter. inc.",
            "email":"MZimber@gmail.com",
            "skill": "Sales Manager",
            "phone": "(123)456-7890",
            "img": "/img/michael_zimber.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107',
    },
        
    '1519720712929':{
            "id": "1519720712929",
            "name": "Monica Smith",
            "company": "Twitter. inc.",
            "email":"monismith@gmail.com",
            "skill": "Graphic Designer",
            "phone": "(123)426-7190",
            "img": "/img/monica_smith.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107'
    },
    '1519720712930':{   "id": "1519720712930",
            "name": "Sandra Smith",
            "company": "Twitter. inc.",
            "email":"sansmith@gmail.com",
            "skill": "Graphic Designer",
            "phone": "(123)456-1890",
            "img": "/img/sandra_smith.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107'
    },
    '1519720712931':{
            "id": "1519720712931",
            "name": "John Smith",
            "company": "Twitter. inc.",
            "email":"jsmith@gmail.com",
            "skill": "Graphic Designer",
            "phone": "(123)556-7890",
            "img": "/img/john_smith.jpg",
            "location": {
                "lat": 37.7855662,
                "lng": -122.3969688
               },
            "address": '795 Folsom Ave, Suite 600',
            "city": 'San Francisco, CA 94107' 
        }}

    static getAllContacts (){
        let contacts = window.localStorage.getItem('contactsDB') ;

        if(contacts) {
            this.contacts = JSON.parse(contacts)
          }
          else {
            window.localStorage.setItem('contactsDB', JSON.stringify(this.contacts))
          }
          
        return this.contacts
    }

    static validateContact(contact) 
    {
        if(contact.id == "")
        {
            alert("ID field is required") ;
            return false ;
        }

        if(contact.name == "" )
        {
            alert("Name field is required") ;
            return false ;
        }
        
        const regex_phone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (!regex_phone.test(contact.phone)) {
            alert("Wrong phone no");
            return false
        }

        const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex_email.test(contact.email)) {
            alert("Wrong email");
            return false
        }

        if(contact.address == "" )
        {
            alert("Address field is required") ;
            return false ;
        }
        if(contact.city == "" )
        {
            alert("City field is required") ;
            return false ;
        }

        if(contact.img == "")
        {
            alert("img field is required") ;
            return false ;
        }

        
        else return true
    }

    static getContact (contactId){
        return this.contacts[contactId];
    }
    static async createContact (contact){
        if( this.validateContact(contact) )
        {
            await this.getGps(contact)
            this.contacts[contact.id] = contact;
            window.localStorage.setItem('contactsDB', JSON.stringify(this.contacts))

            return true ;
        }
        return false ;
    }
    
    static deleteContact (contactId){
        if( this.contacts[contactId] )
        {
            delete this.contacts[contactId]
            window.localStorage.setItem('contactsDB', JSON.stringify(this.contacts))
            return this.contacts ;
        } 
    } 

    static async getGps(contact) {
        contact.city = contact.city || ''
        contact.address = contact.address || ''
        let address = (contact.city + contact.address) || 'paris'
        const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +'&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8'
        console.log(api);
        await axios.get(api)
        .then((response) => {
          contact.location = response.data.results[0].geometry.location
        })
        .catch((error) => {
          console.log(error);
          contact.location = {
            lat: 'Shit',
            lng: 'Happened'
          }
        })
      }
}