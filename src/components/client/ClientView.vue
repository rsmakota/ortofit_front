<template>
  <!--<div>User  $route.params.id </div>-->
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Клиент
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/client_list" ><i class="fa fa-users"></i>Список клиентов</router-link>
        </li>
        <li class="active">Клиент</li>
      </ol>
    </section>

    <section class="content">

      <div class="row">
        <div class="col-md-3">
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" alt="User profile picture" :src="clientAvatar">
              <h3 class="profile-username text-center">{{ client.name }}</h3>
              <p class="text-muted text-center">{{ client.msisdn }}</p>
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Клиент с:</b>
                  <span class="pull-right"> client.created.format('d/m/Y') </span>
                </li>
                <li class="list-group-item">
                  <b>Членов семьи:</b>
                  <span class="pull-right"> client.persons.count() </span>
                </li>
                <li class="list-group-item">
                  <b>Последний визит:</b>
                  <span class="pull-right"> lastApp.created.format('d/m/Y')|default('-') </span>
                </li>

              </ul>
              <div class="text-center">
                <button class="btn btn-primary" type="button"><i class="fa fa-user-plus"></i> <span>Член семьи</span></button>
                <button class="btn btn-primary" type="button"><i class="fa fa-pencil"></i> <span>Редактировать</span></button>

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">{% set activeClass = 'active' %}
              {% for person in client.persons %}
              <li class="{{ activeClass }}"><a data-toggle="tab" href="#{{ person.familyStatus.alias ~ person.id }}">{{ person.name }}</a></li>
              {% set activeClass = '' %}
              {% endfor %}
            </ul>
            <div class="tab-content">

              {% set activeClass = 'active' %}
              {% for person in client.persons %}
              <div id="{{ person.familyStatus.alias ~ person.id }}" class="tab-pane {{ activeClass }}">
                <div class="post">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" alt="user image"
                         {% if person.familyStatus.alias == 'self' %}
                    {% if client.getGender() == 'male' %}
                    src="{{ '../bundles/ortofitbackofficefront/dist/img/avatar5.png' }}"
                    {% else %}
                    src="{{ '../bundles/ortofitbackofficefront/dist/img/avatar3.png' }}"
                    {% endif %}
                    {% else %}
                    src="{{ '../bundles/ortofitbackofficefront/dist/img/avatar-' ~ person.familyStatus.alias ~ '.png' }}"
                    {% endif %}
                    >
                    <span class="username"> <a href="#">{{ person.name }} </a></span>
                    <span class="description">{{ person.familyStatus.name }} ({{ person.getAge() }} лет)</span>
                  </div>
                  <button class="btn btn-primary person-diagnosis" person-id="{{ person.id }}" type="button"><i class="fa fa-plus"></i> <span>Диагноз</span></button>
                  <button class="btn btn-primary person-edit" person-id="{{ person.id }}" type="button"><i class="fa fa-pencil"></i> <span>Редактировать</span></button>
                  <h5><strong>Диагноз:</strong></h5>
                  {% for diagnosis in person.diagnoses %}
                  <p>
                  <hr>
                  <i><strong>{{ diagnosis.created|date('d/m/Y') }}</strong></i> <a href="#" class="diagnosis" person-id="{{ person.id }}" id="{{ diagnosis.id}}"><i class="fa fa-pencil"></i></a>
                  <br> {{ diagnosis.description }}
                  </p>
                  {% endfor %}
                </div>
              </div>
              {% set activeClass = '' %}
              {% endfor %}

            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <table class="table table-striped" style="text-align: center">
              <thead>
              <tr >
                <th style="text-align: center">Дата</th>
                <th style="text-align: center">Время</th>
                <th style="text-align: center">Оффис</th>
                <th style="text-align: center">Врач</th>
                <th style="text-align: center">Заявка</th>
                <th style="text-align: center">Оказана</th>
                <th style="text-align: center">Оформлен</th>
                <th style="text-align: center">Причина</th>
              </tr>
              </thead>
              <tbody>
              {# @var app \Ortofit\Bundle\BackOfficeBundle\Entity\Appointment #}
              {% for app in allApp %}
              <tr>
                <td>{{ app.getDateTime().format('d/m/Y') }}</td>
                <td>{{ app.getDateTime().format('H:i') }}</td>
                <td>
                  {% if app.office != null %}
                  {{ app.office.name }}
                  {% endif %}
                </td>
                <td>
                  {% if app.user != null %}
                  {{ app.user.name }}
                  {% endif %}
                </td>
                <td>
                  {% if app.service != null %}
                  {{ app.service.name }}
                  {% endif %}
                </td>
                <td>
                  {# @var service \Ortofit\Bundle\BackOfficeBundle\Entity\PersonService#}
                  {% for service in app.personServices  %}
                  ({{ service.person.familyStatus.name}}) <strong>{{ service.person.name }}</strong>: {{ service.service.name }}<br>
                  {% endfor %}
                </td>
                <td>
                  {% if app.state == 4 %}
                  <i class="fa fa-check" aria-hidden="true" style="color: green"></i>
                  {% elseif  app.state == 3 %}
                  <i class="fa fa-close" aria-hidden="true" style="color: red"></i>
                  {% else %}
                  <i class="fa fa-circle-thin" aria-hidden="true" style="color: grey"></i>
                  {% endif  %}

                </td>
                <td>
                  {% for reason in app.appointmentReasons %}
                  {{ reason.reason.name }} <br>
                  {% endfor %}
                </td>
              </tr>
              {% endfor %}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import clientService from './../../service/ClientService'

  export default {
    data () {
      return {
        client: clientService.getEmpty(),
        avatarPath: '/static/img/avatar/'
      }
    },
    computed: {
      clientAvatar: function () {
        if (this.client.gender === 'male') {
          return this.avatarPath + 'avatar5.png'
        }
        if (this.client.gender === 'female') {
          return this.avatarPath + 'avatar3.png'
        }
        return this.avatarPath + 'unknown.png'
      }
    }
  }
</script>
