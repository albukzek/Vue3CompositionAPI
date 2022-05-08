<template>
  <app-page back title="Помощь">
    <question-items 
      v-for="q in questions"
      :key="q.title"
      :question="q"
    ></question-items>
  </app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage.vue'
import QuestionItems from '../components/question/QuestionItem.vue'
export default {
  name:'Help',
  components:{AppPage, QuestionItems},
  setup(){

    const questions = [
      {title:'Что есть  данной системе?', text:'Тут есть все, для того, чтобы смотреть, какие заявки человек добавил'},
      {title:'Как тут работает авторизация?', text:'Все реализовано через Firbase'}
    ]

    return{
      questions
    }
  }
}
</script>
