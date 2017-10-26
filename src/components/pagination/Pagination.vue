<template>
  <ul class="pagination" style="margin: auto">
    <li id="previous" class="paginate_button previous" v-bind:class="{'disabled': pagination.first}">
      <a href="#" :disabled="pagination.first">Previous</a>
    </li>

    <li class="paginate_button" v-if="start > 1">
      <a href="" @click="changePage(1)">{{ 1 }}</a>
    </li>
    <li v-if="start > 1"><a href="#">...</a></li>

    <li class="paginate_button" v-if="pagination.totalPages > 0" v-for="pageNum in pages" v-bind:class="{'active': (pageNum == pagination.number)}">
      <a href="#" @click="changePage(pageNum)">{{ pageNum }}</a>
    </li>

    <li v-if="end < pagination.totalPages"><a href="#">...</a></li>
    <li class="paginate_button" v-if="end < pagination.totalPages">
      <a href="" @click="changePage(pagination.totalPages)">{{ pagination.totalPages }}</a>
    </li>

    <li id="next" class="paginate_button next" :class="{'disabled': pagination.last}">
      <span v-if="pagination.last">Next</span>
      <a v-if="!pagination.last" href="#" @click="next">Next</a>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      pagination: {
        type: Object,
        default: function () {
          return {first: true, last: false, number: 1, totalPages: 0, sort: null}
        }
      },
      config: {
        type: Object,
        default: function () {
          return {totalElements: 20}
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      changePage (page) {
        this.$emit('changePage', page)
      },
      next () {
        this.changePage(this.pagination.number + 1)
      }
    },
    computed: {
      start: function () {
        let start = this.pagination.number - Math.floor(this.config.totalElements / 2)
        return (start < 1) ? 1 : start
      },
      end: function () {
        let end = this.start + this.config.totalElements - 1
        return (end > this.pagination.totalPages) ? this.pagination.totalPages : end
      },
      pages: function () {
        let p = []
        for (let i = this.start; i < this.end; i++) {
          p.push(i)
        }
        return p
      }
    }
  }
</script>
