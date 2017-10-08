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
              <!--<input type="text" class="form-control" v-model="msisdn" placeholder="067-359-42-88" id="msisdn" />-->
              <masked-input :disabled="client !== null" v-model="msisdn" mask="111-111-11-11" placeholder="Номер телефона" type="tel" class="form-control" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="clientName" class="col-sm-3 control-label">Имя:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': clientNameErr}">
              <div class="input-group-addon">
                <i class="fa fa-credit-card icon20"> </i>
              </div>
              <input type="text" class="form-control" id="clientName" placeholder="Имя Клиента" v-model="clientName" :disabled="client !== null"/>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="gender" class="col-sm-3 control-label">Пол:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': genderErr}">
              <div class="input-group-addon" >
                <i class="fa fa-venus-mars icon20"></i>
              </div>
              <select class="form-control" id="gender" v-model="gender" title="gender" :disabled="client !== null">
                <option value="null" disabled>Выберите пол</option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </div>

          </div>
        </div>
        <div class="form-group">
          <label for="direction" class="col-sm-3 control-label">Пол:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': genderErr}">
              <div class="input-group-addon" >
                <i class="fa fa-venus-mars icon20"></i>
              </div>
              <select class="form-control" id="direction" v-model="directionId" title="gender" :disabled="client !== null">
                <option value="null" disabled>Выберите пол</option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </div>

          </div>
        </div>



      </form>
    </div>
  </div>
</template>


<script>
  import maskedInput from 'vue-masked-input'
  import clientService from '../../service/ClientService'

  export default {
    data () {
      return {
        prefix: 38,
        msisdn: null,
        clientName: null,
        gender: null,
        clientDirectionId: null,
        msisdnErr: false,
        clientNameErr: false,
        genderErr: false
      }
    }
  }
</script>

<style>
  .icon20 {
    width:23px;
  }
</style>
