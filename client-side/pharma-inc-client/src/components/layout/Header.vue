<template>
  <nav>
    <div class="nav-left">
      <div class="logo-container">
        <img style="border-radius: 50%;" src="@/assets/images/pharmaInc.png" />
      </div>
      <h1>Pharma Inc</h1>
    </div>
    <div class="nav-right">
      <div class="logged-user">
        <template>
          <img  src="@/assets/icons/account-circle.svg" />
          <span class="user-name">{{ "     " + "Administrador" }}</span>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      balance: "",
      reserved: "",
    };
  }
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 50px;
  padding-right: 30px;
  background: #2e5586;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .balance {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    align-content: flex-end;
    text-align: right;
    flex-direction: column;
  }

  .text_balance {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    align-content: flex-end;
    text-align: right;
  }

  .nav-left {
    display: flex;
    align-items: center;

    .logo-container {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
        height: 30px;
      }
    }

    h1 {
      margin: 0;
      font-size: 32px;
      font-weight: normal;
    }
  }

  .logged-user {
    img {
      width: 36px;
      height: 36px;
    }

    .drop-menu .dropdown-menu {
      min-width: 2rem !important;
    }

    .user-name {
      font-size: 18px;
      color: #f5f5f5;
    }

    .user-name,
    .user-role {
      line-height: 1;
    }

    #exit-button {
      margin-left: 35px;
      cursor: pointer;
    }
    #profile-button {
      margin-left: 22px;
      cursor: pointer;
    }
  }

  .nav-right {
    display: flex;
  }
}
</style>
