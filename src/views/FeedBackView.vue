<template>
    <v-container  fluid style="margin-top: 5vh; margin-bottom: 5vh">
        <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
            <v-card-title>
                <h2>Avis</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4" v-for="comment in guestBook" :key="comment.id_avis">
                        <v-card>
                            <v-card-title>
                                <h3>{{ comment.user.firstname }}</h3>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ comment.libelle_avis }}</p>
                                <v-btn v-if="comment.id_user === currentUser?.id_user || currentUser?.id_role === 3" @click="confirmDelete(comment.id_avis)">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <pagination-component :data=feedBackFest :currentPage="currentPage" :perPage="perPage" :colorcss="colorcss" @page-update="updatePage"></pagination-component>
                <v-spacer></v-spacer>
                <v-btn  color="black" text @click="goToComment">Ajouter un avis</v-btn>
            </v-card-actions>
        </v-card>
      <v-container id="container" fluid>
        <v-container id="namesWrapper">
          <h2>Chat</h2>
          <p>Create un pseudo: </p>
          <div id="error"> </div>
          <form id="usernameForm">
            <input type="text" size="35" id="username" style="margin-right: 10px">
            <input type="submit" value="Envoyer">
          </form>
        </v-container>
        <v-container id="mainWrapper">
          <h2>Chat</h2>
          <v-container id="chatWrapper">
            <v-container id="chatWindow"> </v-container>
            <form id="messageForm">
              <input type="text" size="35" id="message" placeholder="Envoyer un message.">
              <input type="submit" value="Submit">
            </form>
          </v-container>
          <v-container id="userWrapper">
            <v-container id="users"> </v-container>
          </v-container>
        </v-container>
      </v-container>
    </v-container>

</template>

<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: "FeedBackView",
    components: {PaginationComponent},
    data: () => ({
        currentPage: 0,
        perPage: 9,
        colorcss: {
            color: "rgb(50,50,50)"
        },
    }),
    computed: {
        ...mapState('feedback', ['feedBackFest']),
        guestBook() {
            return this.feedBackFest.slice(this.currentPage * this.perPage, (this.currentPage * this.perPage) + this.perPage);
        },
        ...mapGetters('auth', ['user']),
        currentUser() {
            if (this.user) {
                return this.user;
            }
            return null;
        }
    },
    methods: {
        updatePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        goToComment() {
            this.$router.push({name: 'commentFest'}).catch(() => {});
        },
        ...mapActions('feedback', ['deleteGlobalFeedBack']),
        confirmDelete(idx) {
            if (confirm('Voulez-vous vraiment supprimer cet avis ?')) {
                this.deleteGlobalFeedBack(idx)
                    .then(() => {
                        this.$router.go('/feedback');
                    });
            }
        },
    }
}

import $ from "jquery";
import io from "socket.io-client";

$(function(){
  var socket = io.connect('http://localhost:3000');
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chatWindow');
  var $usernameForm = $('#usernameForm');
  var $users = $('#users');
  var $username = $('#username');
  var $error = $('#error');
  $usernameForm.submit(function(e){
    console.log('usernameForm Submit');
    e.preventDefault();
    socket.emit('new user', $username.val(), function(data){
      if(data){
        $('#namesWrapper').hide();
        $('#mainWrapper').show();
        for (var msg in data.messages) {
          $chat.append('Time:'+msg.time+" <strong>"+msg.user+' </strong>: '+msg.msg+'<br>');
        }
      } else{
        $error.html('Username is taken');
      }
    });
  });

  socket.on('usernames', function(data){
    console.log('usernames update function');
    var html = '';
    for(let i = 0; i < data.length; i++){
      html += data[i] + '<br>';
    }
    $users.html(html);
  });

  socket.on('messages', function(data){
    console.log('messages update function');
    var html = '';
    for(let i = 0; i < data.length; i++){
      html += data[i].time+"; <strong>"+data[i].user+' </strong>: '+data[i].msg+'<br>';
    }

    console.log(html);
    $chat.html(html);
  });

  $messageForm.submit(function(e){
    console.log('$messageForm Submit');
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });
});
</script>

<style scoped>
#container{
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#chatWindow{
  border: 2px solid rgb(0, 0, 0);
  border-radius: 5px;
  min-height: 400px;
  padding: 20px;
  background: rgb(255, 222, 89);
}
#mainWrapper{
  display: none;
  float:left;
  border:1px rgb(0, 0, 0) solid;
  border-radius: 10px;
  background: rgb(255, 222, 89);
}
#chatWrapper{
  float:left;
  border:1px rgb(0, 0, 0) solid;
  border-radius: 10px;
  background:rgb(255, 222, 89);
}
#userWrapper{
  float:left;
  border:1px rgb(0, 0, 0) solid;
  border-radius: 10px;
  background: rgb(255, 222, 89);
  padding:10px;
  margin-top: 5px;
}
#namesWrapper{
  float:left;
  border:1px rgb(0, 0, 0) solid;
  border-radius: 10px;
  background: rgb(255, 222, 89);

}
#messageForm{
  margin-top: 10px;

}
input{
  height: 30px;
  border: solid 2px rgb(0, 0, 0);
  border-radius: 10px;
}
</style>