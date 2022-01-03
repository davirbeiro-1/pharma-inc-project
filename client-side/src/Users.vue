<template>
  <main>
    <Header />
    <b-card class="login-card shadow bg-white rounded">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
      <b-card-body>
        <b-card class="-textcenter">
          <div>
            A tabela abaixo lista todos os usuários da nossa empresa, podendo
            ainda mostrar mais informações sobre nossos clientes.
          </div>
        </b-card>
        <div class="header-container">
          <b-form-group
            v-model="sortDirection"
            label=""
            label-cols-sm="0"
            label-align-sm="center"
            label-size="sm"
            class="search-filter"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-radio
                value="userName"
                v-b-tooltip.hover
                title="UNome do Usuário"
                >Usuário</b-form-radio
              >
              <b-form-radio
                value="userNationality"
                v-b-tooltip.hover
                title="Nacionalidade"
                >Nacionalidade</b-form-radio
              >
            </b-form-radio-group>
          </b-form-group>
          <div class="search-container">
            <img :src="searchIcon" />
            <b-form-input v-model="filterText" placeholder="Pesquisar" />
          </div>
        </div>
        <div class="vld-parent">
          <b-table
            striped
            :fields="fields"
            :items="filteredUsers"
            @filtered="onFiltered"
            :per-page="perPage"
            :current-page="currentPage"
            stacked="md"
          >
            <template v-slot:cell(edit)="row">
              <img
                class="item-table"
                :src="editIcon"
                @click="openModal(row.item, row.index, $event.target)"
              />
            </template>
          </b-table>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              v-if="totalRows > 2"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
          <b-modal id="modal-prevent-closing" ref="modal" size="lg" hide-footer>
            <b-card
              class="modal-body"
              bg-variant="primary"
              text-variant="white"
            >
              <div class="image-container">
                <b-img
                  :src="user.userImage"
                  rounded="circle"
                  alt="Circle image"
                  center
                  size="lg"
                  thumbnail
                  fluid-grow
                  style="
                    width: 30% !important;
                    image-rendering: -webkit-optimize-contrast;
                  "
                ></b-img>
              </div>
              <b-card-body>
                <b-form>
                  <b-row>
                    <b-col v-show="!editUserState">
                      <b-form-group
                        label="Nome completo"
                        label-for="user-full-name-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-full-name-input"
                          v-model="user.fullName"
                          class="border border-dark"
                          :readonly="!editUserState"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Pronome Tratamento"
                        label-for="user-title-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-title-input"
                          v-model="user.name.title"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.name.title.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.name.title.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.name.title.required"
                            >Pronome de tratamento é obrigatório (Senhor,
                            Senhora, Mrs, Ms...).</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Nome"
                        label-for="user-name-first-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-name-first-input"
                          v-model="user.name.first"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.name.first.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.name.first.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.name.first.required"
                            >Nome é obrigatório.</span
                          >
                          <span v-show="!$v.user.name.first.minLength"
                            >Nome deve ter mais de 3 caracteres.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Sobrenome"
                        label-for="user-name-last-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-name-last-input"
                          v-model="user.name.last"
                          class="border border-dark"
                          :class="{
                            'is-invalid': submitted && $v.user.name.last.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.name.last.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.name.last.required"
                            >Sobrenome é obrigatório.</span
                          >
                          <span v-show="!$v.user.name.last.minLength"
                            >Sobrenome deve ter mais de 3 caracteres.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Email"
                        label-for="email-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="email-input"
                          v-model="user.email"
                          class="border border-dark"
                          :class="{
                            'is-invalid': submitted && $v.user.email.$error,
                          }"
                          :readonly="!editUserState"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.email.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.email.required"
                            >Email é obrigatório.</span
                          >
                          <span v-show="!$v.user.email.email"
                            >Formato aceito: teste@teste.com</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Gênero"
                        label-for="user-gender-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-select
                          v-show="editUserState"
                          v-model="user.gender"
                          :options="genders"
                          class="border border-dark"
                        ></b-form-select>
                        <b-form-input
                          v-show="!editUserState"
                          id="user-gender-input"
                          v-model="user.gender"
                          class="border border-dark"
                          :readonly="!editUserState"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col class="col-sm-3">
                      <b-form-group
                        label="Nacionalidade"
                        label-for="user-nationality-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-select
                          v-show="editUserState"
                          v-model="user.nationality"
                          :options="nationalities"
                          class="border border-dark"
                        ></b-form-select>
                        <b-form-input
                          v-show="!editUserState"
                          id="user-nationality-input"
                          v-model="user.nationality"
                          class="border border-dark"
                          :readonly="!editUserState"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Data de nascimento"
                        label-for="user-birth-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-birth-input"
                          v-model="user.birth"
                          class="border border-dark"
                          :class="{
                            'is-invalid': submitted && $v.user.birth.$error,
                          }"
                          :readonly="!editUserState"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.birth.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.birth.required"
                            >Data de nascimento é obrigatória.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Telefone"
                        label-for="user-phone-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-phone-input"
                          v-model="user.phone"
                          class="border border-dark"
                          :class="{
                            'is-invalid': submitted && $v.user.phone.$error,
                          }"
                          :readonly="!editUserState"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.phone.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.phone.required"
                            >Telefone é obrigatório.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="ID"
                        label-for="user-id-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-id-input"
                          v-model="user.idValue"
                          class="border border-dark"
                          :class="{
                            'is-invalid': submitted && $v.user.idValue.$error,
                          }"
                          :readonly="!editUserState"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.idValue.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.idValue.required"
                            >Identidade é obrigatória.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col v-show="!editUserState">
                      <b-form-group
                        label="Endereço"
                        label-for="user-address-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-address-input"
                          v-model="user.address"
                          class="border border-dark"
                          :readonly="!editUserState"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Rua"
                        label-for="user-location-street-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-location-street-input"
                          v-model="user.location.street.name"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.location.street.name.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="
                            submitted && $v.user.location.street.name.$error
                          "
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.location.street.name.required"
                            >Rua é obrigatória
                          </span>
                          <span v-show="!$v.user.location.street.name.minLength"
                            >Rua deve ter mais de 3 caracteres.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col class="col-sm-2" v-show="editUserState">
                      <b-form-group
                        label="Número"
                        label-for="user-location-street-number-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-location-street-number-input"
                          v-model="user.location.street.number"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted &&
                              $v.user.location.street.number.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="
                            submitted && $v.user.location.street.number.$error
                          "
                          class="invalid-feedback"
                        >
                          <span
                            v-show="!$v.user.location.street.number.required"
                            >Número é obrigatória
                          </span>
                          <span
                            v-show="!$v.user.location.street.number.minLength"
                            >Número deve ter mais de 3 caracteres.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Estado"
                        label-for="user-location-state-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-location-state-input"
                          v-model="user.location.state"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.location.state.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.location.state.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.location.state.required"
                            >Estado é obrigatório
                          </span>
                          <span v-show="!$v.user.location.state.minLength"
                            >Estado deve ter mais que 3 caracteres</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="Cidade"
                        label-for="user-location-city-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-input
                          id="user-location-city-input"
                          v-model="user.location.city"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.location.city.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-show="submitted && $v.user.location.city.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.location.city.required"
                            >Cidade é obrigatória.</span
                          >
                          <span v-show="!$v.user.location.city.minLength"
                            >Cidade deve ter mais de 3 caracteres.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col v-show="editUserState">
                      <b-form-group
                        label="País"
                        label-for="user-location-country-input"
                        label-class="font-weight-bold pt-0"
                      >
                        <b-form-select
                          v-show="editUserState"
                          v-model="user.location.country"
                          :options="countries"
                          class="border border-dark"
                          :class="{
                            'is-invalid':
                              submitted && $v.user.location.country.$error,
                          }"
                        ></b-form-select>
                        <div
                          v-show="submitted && $v.user.location.country.$error"
                          class="invalid-feedback"
                        >
                          <span v-show="!$v.user.location.country.required"
                            >Pais é obrigatório.</span
                          >
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form>
                <b-row v-show="!editUserState">
                  <b-col>
                    <b-button
                      @click="allowUserEdit()"
                      class="align-button-right"
                      style="margin-left: 5px"
                      variant="light"
                      >Editar Dados</b-button
                    >
                    <b-button
                      @click="closeModal()"
                      class="align-button-right"
                      variant="danger"
                      >Fechar</b-button
                    >
                  </b-col>
                </b-row>
                <b-row v-show="editUserState">
                  <b-col>
                    <b-button
                      @click="handleSubmit"
                      style="margin-left: 5px"
                      class="align-button-right"
                      variant="light"
                      >Enviar Dados</b-button
                    >
                    <b-button
                      @click="cancelUserEdit()"
                      class="align-button-right"
                      variant="danger"
                      >Cancelar</b-button
                    >
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-modal>
        </div>
      </b-card-body>
    </b-card>
  </main>
</template>

<script>
import Header from "./layout/Header.vue";
import plusIcon from "@/assets/icons/2000.svg";
import Loading from "vue-loading-overlay";
import deleteIcon from "@/assets/icons/delete.svg";
import editIcon from "@/assets/icons/pencil.svg";
import doneIcon from "@/assets/icons/done_black_24dp.svg";
import errorIcon from "@/assets/icons/error_black_24dp.svg";
import timeIcon from "@/assets/icons/timelapse_black_24dp.svg";
import searchIcon from "./assets/icons/magnify.svg";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
import { userService } from "./services/user_service";
import { helperService } from "./services/helperService";

import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "list-users",
  components: {
    Loading,
    Header,
  },
  data() {
    return {
      selected: "userName",
      doneIcon,
      errorIcon,
      searchIcon,
      sortDirection: "asc",
      genders: [
        { value: "Masculino", text: "Masculino" },
        { value: "Feminino", text: "Feminino" },
        { value: "outro", text: "Outro" },
      ],
      timeIcon,
      deleteIcon,
      editIcon,
      filterText: "",
      modalTitle: "",
      plusIcon,
      submitted: false,
      editUserState: false,
      countries: [],
      users: [],
      user: {
        name: {
          title: "",
          first: "",
          last: "",
        },
        location: {
          street: {
            number: "",
            name: "",
          },
          city: "",
          country: "",
        },
        fullName: "",
        userImage: "",
        birth: "",
        gender: null,
        phone: "",
        nat: "",
        address: "",
        idValue: "",
        userId: "",
        email: "",
        nationality: "",
      },
      fields: [
        { key: "fullName", label: "Nome", sortable: true },
        { key: "gender", label: "Gênero" },
        {
          key: "birthday",
          label: "Aniversário",
          thStyle: { width: "220px" },
        },
        {
          key: "edit",
          label: "Ações",
          sortable: false,
          thStyle: { width: "150px" },
        },
      ],
      isLoading: false,
      fullPage: true,
      timer: "",
      refreshTimer: 15000,
      totalRows: 1,
      perPage: 15,
      currentPage: 1,
      progressValue: 0,
    };
  },
  computed: {
    filteredUsers: function () {
      this.setBirthdayWithoutYear();
      this.setFullNameToUsers();
      return this.users.filter((item) => {
        if (this.selected === "userNationality" && this.filterText.length > 1) {
          return item.nat.includes(this.filterText);
        } else if (this.selected === "userName" && this.filterText.length > 3) {
          return item.fullName.includes(this.filterText);
        } else {
          return item;
        }
      });
    },
  },
  async created() {
    this.isLoading = true;
    this.users = await userService.getUsers();
    this.nationalities = await helperService.getNationalities();
    this.countries = await helperService.getCountries();
    this.totalRows = this.users.length;
    this.isLoading = false;
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    openModal(user) {
      this.modalTitle = "Detalhes do Usuário";
      this.setUserDataInsideModal(user);
      this.$refs.modal.show();
    },
    setUserDataInsideModal(user) {
      this.user.userId = user.userId;
      this.user.userImage = user.picture.thumbnail;
      this.user.fullName = user.fullName;
      this.user.email = user.email;
      this.user.gender = user.gender;
      this.user.birth = this.formatDate(user.dob.date);
      this.user.phone = user.phone;
      this.user.nationality = user.nat;
      this.user.address = `${user.location.street.name}- ${String(
        user.location.street.number
      )}, ${user.location.city}, ${user.location.state} - ${
        user.location.country
      }`;
      this.user.idValue = user.id.value;
    },
    async handleSubmit(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.submitted = true;
        this.isLoading = true
        const res = await userService.updateUserById(this.user);
        this.$toast.open("Usuário atualizado com sucesso!");
        const users = await userService.getUsers();
        this.users = users;
        this.isLoading = false
        this.$nextTick(() => {
          this.$refs.modal.hide();
        });
      }
    },
    setFullNameToUsers() {
      this.users.forEach((element) => {
        element.fullName = `${element.name.title} ${element.name.first} ${element.name.last}`;
      });
    },
    setBirthdayWithoutYear() {
      this.users.forEach((element) => {
        element.birthday = moment(element.dob.date).format("DD / MM");
      });
    },
    allowUserEdit() {
      this.editUserState = !this.editUserState;
    },
    cancelUserEdit() {
      this.allowUserEdit();
      this.submitted = false;
    },
    closeModal() {
      this.$refs.modal.hide();
    },
  },
  validations: {
    user: {
      name: {
        title: {
          required,
        },
        first: {
          required,
          minLength: minLength(3),
        },
        last: {
          required,
          minLength: minLength(3),
        },
      },
      location: {
        street: {
          name: { required, minLength: minLength(3) },
          number: { required },
        },
        state: { required, minLength: minLength(3) },

        city: { required, minLength: minLength(3) },
        country: { required },
      },
      email: { required, email },
      birth: { required },
      phone: { required },
      idValue: { required },
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;

  .btn-custom {
    background-color: #bee7bd00;
    display: flex;
    border: 1px;
    margin-left: auto;
    margin-right: 0;
  }

  .item-table {
    border: none !important;
    background-color: none;
    cursor: pointer;
  }
}

.header-container {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 400;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .form-control[type="text"] {
      height: 30px;
      width: 200px;
      &:focus {
        box-shadow: none;
        border-color: #ced4da !important;
      }
    }
  }
}

.invalid-feedback {
  color: hsl(0, 88%, 50%);
  font-weight: 300;
}

.align-button-right {
  float: right;
}
</style>

