<template>
    <div class="register">
        <h1>Inscription</h1>
        <form>
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" v-model="username" />
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" v-model="password" />
            <label for="password2">Confirmer le mot de passe</label>
            <input type="password" id="password2" name="password2" v-model="password2" />
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email" />
            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname" v-model="firstname" />
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname" v-model="lastname" />
            <label for="dob">Date de naissance</label>
            <input type="date" id="dob" name="dob" v-model="dob" />
            <label for="address">Adresse</label>
            <input type="text" id="address" name="address" v-model="address" />
            <label for="mobile">Téléphone</label>
            <input type="tel" id="mobile" name="mobile" v-model="mobile" />
        </form>
    </div>
</template>

<script>
export default {
    name: "RegisterForm"
}
</script>

<style scoped>

</style>