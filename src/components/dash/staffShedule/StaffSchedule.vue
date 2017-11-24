<template>
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          График приема
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>График работы</a></li>
        </ol>
      </section>
    <!-- content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <ul id="office_tabs" class="nav nav-tabs">
            <li v-for="(office, index) in offices" :class="{'active': (office.id == currentOfficeId)}">
              <a @click="setOfficeId(office.id)" class="office_link">{{ office.name }}</a>
            </li>
          </ul>
          <div class="box box-primary">
            <div class="box-body no-padding">
              <!-- THE CALENDAR -->
              <full-calendar ref="calendar" :event-sources="eventSources"></full-calendar>
            </div><!-- /.box-body -->
          </div><!-- /. box -->
        </div><!-- /.col -->
      </div><!-- /.row -->
    </section><!-- /.content -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    data () {
      return {
        currentOfficeId: null
      }
    },
    methods: {
    },
    computed: {
      ...mapGetters({
        offices: 'office/getAll'
      }),
      eventSources () {
        //      const self = this
        return [
          //        {
          //          events (start, end, timezone, callback) {
          //            setTimeout(() => {
          //              callback(self.events.filter(() => Math.random() > 0.5))
          //            }, 1000)
          //          }
          //        }
        ]
      }
    }
  }
</script>

<style>
  @import '~fullcalendar/dist/fullcalendar.css';
</style>
