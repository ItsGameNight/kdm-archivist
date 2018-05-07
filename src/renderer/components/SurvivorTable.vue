<template>
  <div>
    <div class="collapse-toggle">
      <span>Collapsed:</span>
      <label class="switch">
        <input type="checkbox" v-model="collapsedState">
        <span class="slider"></span>
      </label>
    </div>
    <div>
      <button @click=addBaseSurvivor()>Add Base Survivor</button>
    </div>
    <div class="table-scroll">
      <table>
        <tr v-for="surv in survivors"><survivor-table-row :survivor="surv" :key='surv._id' :collapsed="collapsedState"></survivor-table-row></tr>
      </table>
    </div>
  </div>
</template>

<script>
import SurvivorTableRow from './SurvivorTableRow'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow },
  methods: {
    // special func that happens on start!
    addBaseSurvivor: function () {
      this.$settlements.getAll((smts) => {
        this.$survivors.addBase(smts[0]._id, { name: 'hi vue' }, (s) => {
          this.survivors.push(s)
        })
      })
    }
  },
  data () {
    return {
      collapsedState: true,
      survivors: []
    }
  },
  created () {
    console.log('created')
    console.log(this)
    this.$settlements.getAll((smts) => {
      this.$survivors.getAll(smts[0]._id, (s) => {
        this.survivors = s
      })
    })
  }
}
</script>

<style>
table {
  width: 98%;
  border-spacing: 0em 0.5em;
}
td {
  border: 1px solid black;
  padding: 5px;
}
.table-scroll {
  height: 580px;
  overflow-y: scroll;
}
.switch {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 12px;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(8px);
  transform: translateX(8px);
}
</style>
