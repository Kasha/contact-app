<template>

    <div class="col s12 l6 xl4" v-if="contact">
      <div class="card-panel z-depth-1 contact">
        <div class="row valign-wrapper">
          <div class="col s4 m5 center-align">
            <div class="inner">
              <img v-if="contact.img" :src="contact.img" alt="name" class="circle responsive-img"><br>
              <img v-if="!contact.img" src="https://img.freepik.com/premium-vector/man-avatar-character-male-portrait-flat-design_532867-538.jpg?w=1060" alt="name" class="circle responsive-img"><br>
              <span class="skill grey-text text-darken-1">{{contact.skill}}</span>
            </div>
          </div>
          <div class="col s8 m7 grey-text text-darken-1">
            <h4 class="name">{{ contact.name }}</h4>
            <p class="location">
            <i class="tiny material-icons">location_on</i>
            <span>lat: {{ contact.location.lat }}, </span>
            <span>lng: {{ contact.location.lng }}</span>
            </p>
            <div class="address-block">
              <h5 class="company">{{ contact.company }}</h5>
              <p class="address">{{ contact.address }}</p>
              <p class="city">{{ contact.city }}</p>
              <p class="tel">P: {{ contact.phone }}</p>
              <p class="email"> <a :href="'mailto:'+contact.email">{{ contact.email }}</a></p>
            </div>
          </div>
        </div>
  
        <div class="buttons-block">
          <i @click="edit" class="tiny material-icons">mode_edit</i>
          <i @click="remove" class="tiny material-icons">delete_forever</i>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'Contact',
    props: ['contact'],
    
    methods: {
      edit(id) {
        this.$emit('edit-contact');
      },
      remove() {
        this.$emit('delete-contact');
      }
    }
  }
  </script>
  