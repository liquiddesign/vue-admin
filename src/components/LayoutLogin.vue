<template>
  <div class="app-container app-theme-white body-tabs-shadow">
    <div class="app-container">
      <div class="h-100 bg-night-sky bg-animation">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="mx-auto app-login-box col-md-8">
            <img class="d-block mx-auto mb-3" src="https://www.lqd.cz/public/images/logo-white.svg" alt="" loading="lazy" height="50">
            <div class="modal-dialog w-100 mx-auto">
              <div class="modal-content">
                <form>
                  <div class="modal-body">
                    <div class="h5 modal-title text-center">
                      <h4 class="mt-2"> <span>Přihlašte se do systému formulářem níže.</span></h4>
                    </div>
                    <div class="row g-3">
                      <div class="col-12 input-required" placeholder="Login">
                        <input type="text" placeholder="Login" class="form-control-sm form-control">
                      </div>
                      <div class="col-12 input-required" placeholder="Heslo">
                        <input type="password" placeholder="Heslo" class="form-control-sm form-control">
                      </div>
                      <div class="col-12 d-inline-block">
                        <div class="position-relative form-check">
                          <input id="remember" type="checkbox" class="form-check-input"><label for="remember" class="form-check-label">Zapamatovat si přihlášení</label>
                        </div><!---->
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer clearfix">
                    <div class="float-start"><a href="javascript:void(0);" class="btn-lg btn btn-link">Obnovit heslo</a></div>
                    <div class="float-end"><button class="btn-primary btn-lg btn btn-primary btn-lg" type="button" @click="login">Přihlásit se</button></div>
                  </div>
                </form>
              </div>
            </div>
            <div class="text-center text-white opacity-8 mt-3">Copyright © Liquid Design 2022 | Vite Build: {{ meta.buildDate ?? '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import {Meta, User} from '../types/BaseTypes';

const meta: Meta = inject('meta') as Meta;
const user: User = inject('user') as User;


function login() {
  user.isLoggedIn = true;
  user.identity = 'PES';
}


</script>