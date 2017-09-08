<template>
  <div>
  <div class="modal-body">

    <ul class="list-group" style="text-align: center" v-if="hasPredefinedParams()">
      <li class="list-group-item list-group-item-info">

        <span v-if="doctor"><i class="fa fa-user-md icon20" > </i> '{{ doctor }}' &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="officeId"><i class="fa fa-building icon20" ></i> {{ getOfficeName(officeId) }} &nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span v-if="date"><i class="fa fa-calendar icon20" ></i> {{date}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="time"><i class="fa fa-clock-o icon20" > </i> {{time}}</span>
      </li>
    </ul>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="msisdn" class="col-sm-3 control-label">Телефон:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon"><strong class="icon20">+{{ prefix }}</strong></div>
            <input type="text" class="form-control" v-model="msisdn" placeholder="067-359-42-88" id="msisdn" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="clientName" class="col-sm-3 control-label">Имя:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-credit-card icon20"> </i>
            </div>
            <input type="text" class="form-control" id="clientName" placeholder="Имя Клиента" v-model="clientName"/>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="gender" class="col-sm-3 control-label">Пол:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-venus-mars icon20"></i>
            </div>
            <select class="form-control" id="gender" v-model="gender" title="gender">
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </div>

        </div>
      </div>



      <div class="form-group">
        <label for="serviceId" class="col-sm-3 control-label">Услуга:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-star icon20"></i>
            </div>
            <select class="form-control" id="serviceId" v-model="service" title="service">
              <option v-for="s in services" v-bind:value="service">{{ s.name }}</option>
            </select>
          </div>

        </div>
      </div>


      <div class="form-group" v-if="officeId == null">
        <label for="officeId" class="col-sm-3 control-label">Офис:</label>
        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-building icon20"></i>
            </div>
            <select class="form-control" id="officeId" v-model="officeId" title="office">
              <option v-for="o in offices" v-bind:value="o.id">{{ o.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <input type="hidden" v-else="officeId != null" v-model="officeId" />
      <div class="form-group">
        <label for="duration" class="col-sm-3 control-label">Прием:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-hourglass-1 icon20"></i>
            </div>
            <select class="form-control" id="duration" v-model="duration" title="duration">
              <option v-for="i in 4" v-bind:value="i*15">{{ (i*15) }} мин.</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="date" class="col-sm-3 control-label">Дата:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-calendar icon20"></i>
            </div>
            <input id="date" v-model="date" class="form-control pull-right active" type="text" />
          </div>
        </div>
      </div>


      <div class="form-group">
        <label for="time" class="col-sm-3 control-label">Время:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-clock-o icon20"></i>
            </div>
            <input id="time" class="form-control pull-right active" type="text" v-model="time" />
          </div>
        </div>
      </div>


      <div class="form-group">
        <label for="doctorId" class="col-sm-3 control-label">Сотрудник:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-user-md icon20"></i>
            </div>
            <select class="form-control" id="doctorId" v-model="doctor" title="doctor" >
              <option v-for="d in doctors" v-bind:value="doctor">{{ d.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="forwarder" class="col-sm-3 control-label">Направил:</label>
        <div class="col-sm-6">
          <div class="input-group">
            <div class="input-group-addon"><i class="fa fa-hand-o-right icon20"></i></div>
            <input id="forwarder" class="form-control pull-right active" type="text"
                   placeholder="Врач направивший клиента" v-model="forwarder"/>
          </div>

        </div>
        <div class="col-sm-3">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="flyer" id="flyer" value="1">
              Направление
            </label>
          </div>

        </div>
      </div>
      <div class="form-group">
        <label for="bold" class="col-sm-3 control-label">Выделить:</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input id="bold" class="" type="checkbox" v-model="bold" value="1" />
          </div>
        </div>

      </div>
      <div class="form-group">
        <label for="description" class="col-sm-3 control-label">Заметка:</label>

        <div class="col-sm-9">
          <textarea class="form-control" rows="3" id="description" v-model="description" title="description">{{ description }}</textarea>
        </div>
      </div>

      <input type="hidden" id="appId"       v-model="appId">
      <input type="hidden" id="clientId"    v-model="clientId">
      <input type="hidden" id="directionId" v-model="directionId">

    </form>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" v-on:click="">Закрыть</button>
    <button type="button" class="btn btn-primary" id="saveButton">Сохранить</button>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['params'],
    data () {
      return {
        doctor: null,
        officeId: null,
        service: null,
        doctors: [],
        offices: this.$store.getters['office/getAll'],
        services: [],
        date: null,
        time: null,
        prefix: 38,
        msisdn: null,
        clientName: null,
        gender: null,
        duration: 15,
        forwarder: null,
        flyer: null,
        bold: null,
        description: null,
        appId: null,
        clientId: null,
        directionId: null
      }
    },
    methods: {
      hasPredefinedParams: function () {
        return (this.doctorId !== null) || (this.officeId !== null) || (this.date !== null) || (this.time !== null)
      },
      getOfficeName: function (id) {
        return this.$store.getters['office/getOfficeById'](id).name
      },
      getOfficeNameById: function (id) {
        let office = this.$store.getters['office/getOfficeById'](id)
        return ('name' in office) ? office.name : ''
      }
    },
    mounted () {
      this.officeId = ('officeId' in this.params) ? this.params.officeId : null
    }
  }
</script>
