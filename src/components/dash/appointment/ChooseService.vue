<template>
  <div class="modal-body">
    <info-panel></info-panel>
    <div class="row">
      <form class="form-horizontal" id="serviceForm">
        <div class="col-sm-7">
          <table class="table table-striped">
            <thead>
            <tr>
              <th colspan="2">Оказанные услуги:</th>
              <th>Кол.</th>
            </tr>
            </thead>
            {% for service in services %}
            <tr class="tr-service">
              {#<td><i class="fa fa-star-o icon20"> </i></td>#}
              <td>
                <input type="checkbox" id="service_{{ service.id }}" name="service_{{ service.id }}"
                       value="{{ service.id }}" title="{{ service.name }}" class="chb-service"
                       {% if service.id in storedServices %}
                       checked
                       {% endif %}
                />
              </td>
              <td>{{ service.name }}</td>
              <td>
                <select id="serviceNum{{ service.id }}" name="serviceNum{{ service.id }}" size="1">
                  {% for i in 1..4  %}
                  <option value="{{ i }}"
                          {% if (attribute(storedServicesNum, service.id) is defined) and (storedServicesNum[service.id] == i) %}
                          selected
                          {% endif %}
                  >{{ i }}</option>
                  {% endfor %}
                </select>
              </td>
            </tr>

            {% endfor %}
          </table>
        </div>
        <div class="col-sm-5" style="padding-left: 0;">
          <table class="table table-striped">
            <thead>
            <tr>
              <th colspan="3">Другое:</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><i class="fa fa-hand-o-right icon20"></i></td>
              <td>Направил</td>
              <td><input id="forwarder" name="forwarder" class="form-control pull-right active nes"
                         type="text" placeholder="Врач"
                         value="{{ app.forwarder }}"/></td>
            </tr>
            <tr>
              <td > <i class="fa fa-list-alt icon20"></i></td><td colspan="2"> Наличие направления
              <input id="flyer" name="flyer" class="active nes"
                     type="checkbox" style="position: absolute; right: 20px"
                     value="1" {% if app.flyer %} checked {% endif %}/></td>
            </tr>

            <tr>
              <td><i class="fa fa-bell-o icon20"></i></td>
              <td>Повтор</td>
              <td><input id="remind" name="remind" class="form-control pull-right active nes" type="text"
                         data-inputmask="'alias': 'dd/mm/yyyy'" data-mask
                         placeholder="{{ "now"|date("d/m/Y") }}"
                value=""/></td>
            </tr>
            <tr id="remindNotice" class="hidden">
              <td colspan="3" style="color: red; text-align: center;">Введите корректно дату</td>
            </tr>
            <tr>
              <td colspan="3">
                Комментарий к напоминанию
                <textarea rows="6" id="description" name="description" class="form-control nes"
                          placeholder="Комментарий к напоминанию"></textarea>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-success" id="nextButton">Оформить</button>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'

  export default {
    props: ['appointment', 'office', 'client', 'person'],
    data () {
      return {
//        description: null
      }
    },
    methods: {
      save () {
//        let diagnosis = null
//        if (this.description !== null) {
//          diagnosis = {personId: this.person.id, description: this.description}
//        }
//        this.$emit('save', diagnosis)
      }
    },
    components: {
      'info-panel': InfoPanel
    }
  }
</script>
