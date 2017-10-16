<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">Имя:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': nameErr}">
              <div class="input-group-addon">
                <i class="fa fa-user icon20"> </i>
              </div>
              <input type="text" class="form-control" v-model="person.name"  @click="elClick('nameErr')"
                     placeholder="Имя Пациента"/>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Дата Рождения:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': bornErr}">
              <div class="input-group-addon">
                <i class="fa fa-birthday-cake icon20"></i>
              </div>
              <date-picker :config="dtConf" v-model="person.born" @click="elClick('bornErr')"></date-picker>
            </div>

          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Пол:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': genderErr}">
              <div class="input-group-addon">
                <i class="fa fa-venus-mars icon20"></i>
              </div>
              <select class="form-control" id="gender" v-model="person.gender" @click="elClick('genderErr')" >
                <option value="null" disabled>Выберите пол</option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Статус:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': familyStatusErr}">
              <div class="input-group-addon"> <i class="fa fa-users icon20"></i> </div>
              <select class="form-control" v-model="person.familyStatus"  @click="elClick('familyStatusErr')">
                <option value="null" disabled>Выберите статус</option>
                <option v-for="familyStatus in familyStatuses" v-bind:value="familyStatus">{{ familyStatus.name }}</option>
              </select>
            </div>

          </div>
        </div>
        <br><br><br><br>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="btnSavePerson"> Сохранить </button>
    </div>
  </div>
</template>

<script>
//  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['client', 'person', 'familyStatuses'],
    data () {
      return {
        nameErr: false,
        genderErr: false,
        familyStatusErr: false,
        bornErr: false,
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'}
      }
    },
    methods: {
      btnSavePerson () {
//        console.log(this['dtConf'])
        if (this.sanitize()) {
          this.$emit('save')
        }
      },
      sanitize () {
        this.nameErr = ((this.person.name === null) || (this.person.name.length < 1))
        this.genderErr = (this.person === null)
        this.familyStatusErr = (this.person.familyStatus === null)
        this.bornErr = (this.person.born === null)
        console.log(this.nameErr, this.genderErr, this.familyStatusErr, this.bornErr)
        return (!this.nameErr && !this.genderErr && !this.familyStatusErr && !this.bornErr)
      },
      elClick (field) {
        this[field] = false
      }
    },
    components: {
      datePicker
    }
  }
</script>
