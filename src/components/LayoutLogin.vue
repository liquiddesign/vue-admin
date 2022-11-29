<template>
  <div class="app-container app-theme-white body-tabs-shadow">
    <div class="app-container">
      <div class="h-100 bg-night-sky bg-animation">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="mx-auto app-login-box col-md-8 col-sm-8 col-lg-3">
            <img class="d-block mx-auto mb-3" src="/logo-white.svg" alt="" loading="lazy" height="50">
            <div class="modal-dialog w-100 mx-auto">
              <div class="modal-content">
                <BaseForm ref="form" :input="input" :rules="rules" :mutation="mutation" @success="success" :maps-cb="function (object) { return object;}">
                  <div class="modal-body">
                    <div class="h5 modal-title text-center">
                      <h4 class="mt-2"> <span>Přihlašte se do systému formulářem níže.</span></h4>
                    </div>
                    <div class="row g-3">
                      <BaseFormInput wrap="col-12 input-required" name="login" placeholder="Login" autocomplete="username" />
                      <BaseFormInput wrap="col-12 input-required" name="password" type="password" placeholder="Heslo" autocomplete="current-password" />

                      <div class="col-12 d-inline-block">
                        <div class="position-relative form-check">
                          <input id="remember" type="checkbox" class="form-check-input"><label for="remember" class="form-check-label">Zapamatovat si přihlášení</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer clearfix">
                    <div class="float-start"><a href="javascript:void(0);" class="btn-lg btn btn-link">Obnovit heslo</a></div>
                    <div class="float-end"><BaseFormButton class="btn-primary btn-lg">Přihlásit se</BaseFormButton></div>
                  </div>
                </BaseForm>
              </div>
            </div>
            <div class="text-center text-white opacity-8 mt-3">Copyright © Liquid Design {{ (new Date()).getFullYear() }} | {{ meta.buildDate ?? '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, reactive} from 'vue';
import {Meta, User} from '../types/BaseTypes';
import BaseForm from "./BaseForm.vue";
import {required} from "@vuelidate/validators";
import gql from "graphql-tag";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormButton from "./BaseFormButton.vue";

const meta: Meta = inject('meta') as Meta;
const user: User = inject('user') as User;

const input = reactive({});

const rules = {
  login: {
    required
  },
  password: {
    required
  },
};

const mutation = gql`
      mutation ($login: String!, $password: String!) {
        result: authAdminLogin(login: $login, password: $password) {
            uuid,
            fullName,
            accounts {
              uuid,
              login
            }
        }
      }
    `

function success(response: any) {
  // login
  user.isLoggedIn = true;
  Object.assign(user.identity, response.data.result);
  user.identity.account = user.identity.accounts[0];
}



</script>