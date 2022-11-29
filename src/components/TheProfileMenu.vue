<template>
  <div class="widget-content-left">
    <div class="btn-group">
      <a data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
        <img width="42" class="rounded-circle" src="/avatar.jpg" alt="">
        <i class="fa fa-angle-down ms-2 opacity-8" />
      </a>
      <div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
        <div class="dropdown-menu-header">
          <div class="dropdown-menu-header-inner bg-heavy-rain">
            <div class="menu-header-image" />
            <div class="menu-header-content text-start">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left me-3">
                    <img width="42" class="rounded-circle" src="/avatar.jpg" alt="">
                  </div>
                  <div class="widget-content-left">
                    <div class="widget-heading text-dark">{{ user.identity.fullName }}</div>
                    <div class="widget-subheading text-dark opacity-8">{{ user.identity.account.login }}</div>
                  </div>
                  <div class="widget-content-right me-2" @click="logout">
                    <button class="btn-pill btn-shadow btn-shine btn btn-focus" @click="logout">Odhlásit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="0">
          <div class="scrollbar-container ps">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link">
                  Chat
                  <div class="ms-auto badge rounded-pill bg-info">8</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p class="ps-2 mb-0">
          <span style="font-weight: lighter">Role:</span>: -
        </p>
        <ul class="nav flex-column">
          <li class="nav-item-divider nav-item" />
          <li class="nav-item-btn text-center nav-item">
            <button class="btn-wide btn btn-success btn-sm" @click="$router.push({name: 'settingsProfile'})"><i class="fa fa-edit" /> Editovat profil </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {User} from "../types/BaseTypes";
import {inject} from "vue";

const user: User = inject('user') as User;

function logout() {
  user.isLoggedIn = false;
  user.identity = {};
}


</script>