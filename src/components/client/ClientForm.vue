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
              <masked-input v-model="msisdn" mask="111-111-11-11" :disabled="isClientEditBlocked || (client.id !== null)"
                            placeholder="Номер телефона" type="tel" class="form-control" id="msisdn" />
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
              <input type="text" class="form-control" id="clientName" :disabled="isClientEditBlocked"
                     placeholder="Имя Клиента" v-model="client.name" @click="clientNameClick"/>
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
              <select class="form-control" id="gender" v-model="client.gender" @click="genderClick"
                      title="gender" :disabled="isClientEditBlocked">
                <option value="null" disabled>Выберите пол</option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </div>

          </div>
        </div>
        <div class="form-group" v-if="hasDirectionEl">
          <label for="direction" class="col-sm-3 control-label">Источник:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': clientDirectionErr}">
              <div class="input-group-addon" >
                <i class="fa fa-arrow-right icon20"></i>
              </div>
              <select class="form-control" id="direction" v-model="client.clientDirectionId" title="gender" :disabled="isClientEditBlocked">
                <option value="null" disabled>Откуда узнали о нас</option>
                <option v-for="cd in clientDirections" v-bind:value="cd.id">{{ cd.name }}</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary" v-on:click="btnEditClient" v-if="isClientEditBlocked">
        Редактировать
      </button>
      <button type="button" class="btn btn-primary" v-on:click="btnSavePerson" :disabled="freeze" v-if="!isClientEditBlocked">
        Сохранить
      </button>
      <button type="button" v-if="hasClient" class="btn btn-success" v-on:click="btnNext" :disabled="freeze || !isClientEditBlocked">Далее >></button>
    </div>
  </div>
</template>


<script>
  import maskedInput from 'vue-masked-input'
  import clientDirectionService from '../../service/ClientDirectionService'
  import CLIENT_CONST from './ClientConst'

  export default {
    props: ['client', 'mod'],
    data () {
      return {
        prefix: 38,
        msisdn: null,
        msisdnErr: false,
        clientName: null,
        clientNameErr: false,
        gender: null,
        genderErr: false,
        clientDirections: clientDirectionService.getAll(),
        clientDirectionErr: false,
        hasClient: false,
        freeze: false,
        isClientEditBlocked: false
      }
    },
    watch: {
      msisdn: function (val) {
        this.msisdnErr = false
        this.client.msisdn = this.prefix + val.replace(/[^0-9]/gim, '')
        if (this.client.msisdn.length === 12) {
          this.$emit('findByMsisdn', this.client.msisdn, this.setClient)
        }
      },
      client: function () {
        this.hasClient = true
        this.isClientEditBlocked = !((this.mod === CLIENT_CONST.FORM.MOD.ABSOLUTELY) && (this.client.clientDirectionId === null))
        this.freeze = false
      }
    },
    methods: {
      sanitizeClient: function () {
        this.msisdnErr = (this.client.msisdn === null) || (this.client.msisdn.length < 12) || this.client.msisdn.substring(0, 3) !== '380'
        this.clientNameErr = (this.client.name === null || this.client.name.length < 1)
        this.genderErr = (this.client.gender === null)
        this.clientDirectionErr = (this.client.clientDirectionId === null) && this.hasDirectionEl
        return (!this.msisdnErr && !this.clientNameErr && !this.genderErr)
      },
      btnSavePerson: function () {
        if (!this.sanitizeClient()) {
          return
        }
        this.freeze = true
        this.$emit('save', this.client, this.setClient)
      },
      btnEditClient: function () {
        this.isClientEditBlocked = false
      },
      btnNext: function () {
        this.$emit('complete', this.client)
      },
      clientNameClick: function () {
        this.clientNameErr = false
      },
      genderClick: function () {
        this.genderErr = false
      }
    },
    components: {
      maskedInput
    },
    mounted () {
      this.msisdn = ((this.client.msisdn !== null) && (this.client.msisdn.length > 1)) ? this.client.msisdn.substring(2) : null
      this.clientName = this.client.name
      this.gender = this.client.gender
    },
    computed: {
      hasDirectionEl: function () {
        return this.mod !== CLIENT_CONST.FORM.MOD.SHORT
      }
    }
  }
</script>

<style>
  .icon20 {
    width:23px;
  }
</style>
