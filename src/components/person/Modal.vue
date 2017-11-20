<template>
  <modal name="person-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <person-form
        @complete="closeEventHandler"
        @save="personFormSave"
        :person="person"
        :client="client"
        :familyStatuses="familyStatuses"
        >

      </person-form>
    </div>
  </modal>
</template>

<script>
  import personService from './../../service/PersonService'
  import PersonForm from './PersonForm.vue'
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    data () {
      return {
        params: null,
        person: null,
        client: null,
        title: ''
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.title = this.params.title
        this.client = this.params.client
        if (this.params.person) {
          this.person = this.params.person
          this.person.born = moment.isMoment(this.person.born) ? this.person.born : moment(this.person.born)
        } else {
          this.person = personService.getEmpty()
        }
      },
      personFormSave () {
        personService.save(this.person, this.closeEventHandler, this.errorResponse)
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        this.$modal.hide('person-modal')
      }
    },
    components: {
      'person-form': PersonForm
    },
    computed: {
      ...mapGetters({
        familyStatuses: 'familyStatus/getAll'
      })
    }
  }
</script>
