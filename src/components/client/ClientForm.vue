<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="msisdn" class="col-sm-3 control-label">Телефон:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': msisdnErr}">
              <div class="input-group-addon">
                <strong class="icon20">+{{ prefix }}</strong></div>
              <masked-input v-model="msisdn" mask="111-111-11-11" placeholder="Номер телефона" type="tel" class="form-control" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="clientName" class="col-sm-3 control-label">Имя:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': clientNameErr}">
              <div class="input-group-addon">
                <i class="fa fa-credit-card icon20"> </i>
              </div>
              <input type="text" class="form-control" id="clientName" placeholder="Имя Клиента" v-model="client.name"/>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="gender" class="col-sm-3 control-label">Пол:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': genderErr}">
              <div class="input-group-addon" >
                <i class="fa fa-venus-mars icon20"></i>
              </div>
              <select class="form-control" id="gender" v-model="client.gender" title="gender">
                <option value="null" disabled>Выберите пол</option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </div>

          </div>
        </div>
        <div class="form-group">
          <label for="direction" class="col-sm-3 control-label">Источник:</label>

          <div class="col-sm-9">
            <div class="input-group">
              <div class="input-group-addon" >
                <i class="fa fa-arrow-right icon20"></i>
              </div>
              <select class="form-control" id="direction" v-model="client.clientDirectionId" title="gender">
                <option value="null" disabled>Откуда узнали о нас</option>
                <option v-for="cd in clientDirections" v-bind:value="cd.id">{{ cd.name }}</option>
              </select>
            </div>

          </div>
        </div>

      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary" v-on:click="btnSaveClient">Далее >></button>
    </div>
  </div>
</template>


<script>
  import maskedInput from 'vue-masked-input'
  import clientService from '../../service/ClientService'
  import clientDirectionService from '../../service/ClientDirectionService'

  export default {
    data () {
      return {
        prefix: 38,
        msisdn: null,
        clientName: null,
//        gender: null,
//        clientDirectionId: null,
        msisdnErr: false,
        clientNameErr: false,
        genderErr: false,
        clientDirections: clientDirectionService.getAll(),
        client: {name: null, gender: null, msisdn: null, clientDirectionId: null}
      }
    },
    watch: {
      msisdn: function (val) {
        this.msisdnErr = false
        this.client.msisdn = this.prefix + val.replace(/[^0-9]/gim, '')
        if (this.client.msisdn.length === 12) {
          clientService.findByMsisdn(this.client.msisdn, this.setClient)
        }
      },
      clientName: function () {
        this.clientNameErr = false
      },
      gender: function () {
        this.genderErr = false
      }
    },
    methods: {
      setClient: function (client) {
        this.client = client
      },
      sanitizeClient: function () {
        this.msisdnErr = (this.client.msisdn.length < 12) || this.client.msisdn.substring(0, 3) !== '380'
        this.clientNameErr = (this.clientName === null || this.clientName.length < 1)
        this.genderErr = (this.gender === null)
        return (!this.msisdnErr && !this.clientNameErr && !this.genderErr)
      },
      btnSaveClient: function () {
        let data = {msisdn: (this.prefix + this.number), name: this.clientName, gender: this.gender, countryId: 1}
        if (!this.sanitizeClient()) {
          return
        }
        clientService.create(data, this.setClient)
      }
    },
    components: {
      maskedInput
    }
  }
</script>

<style>
  .icon20 {
    width:23px;
  }
</style>
