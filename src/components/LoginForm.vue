<template>
    <div class="login">
        <h1>Connexion</h1>
        <form>
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" v-model="username" />
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" v-model="password" />
            <button type="submit" @click.prevent="login">Se connecter</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginForm"
}
</script>