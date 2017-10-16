<template>
  <ul class="list-group" style="text-align: center">
    <li class="list-group-item list-group-item-info" style="text-align: center">
      <span v-if="office">  <i class="fa fa-building icon20" ></i> {{ office.name }} &nbsp;&nbsp; </span>
      <span v-if="dateTime">  <i class="fa fa-calendar icon20" ></i> {{ dateTime.format('DD/MM/YYYY' )}} &nbsp;&nbsp; </span>
      <span v-if="dateTime">  <i class="fa fa-clock-o icon20" > </i> {{ dateTime.format('HH:mm') }} &nbsp;&nbsp; </span>
      <span v-if="client">  <i class="fa fa-credit-card icon20" > </i> {{ client.name }} &nbsp;&nbsp; </span>
      <span v-if="person">  <i class="fa fa-user icon20"> </i> {{ person.name }} </span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['appointment', 'office', 'client', 'dateTime', 'person']
  }
</script>
