<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Submit Feedback</v-card-title>
      <v-card-text>
        <v-form ref="feedbackForm">
          <v-textarea
            v-model="feedback.message"
            label="Your Feedback"
            :rules="[rules.required]"
            outlined
            required
          ></v-textarea>
          <v-select
            v-model="feedback.type"
            :items="feedbackTypes"
            label="Type"
            :rules="[rules.required]"
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="submitFeedback"
          :disabled="!feedback.message || !feedback.type"
        >
          Submit
        </v-btn>
        <v-btn text @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import posthog from 'posthog-js';

export default {
  data() {
    return {
      dialog: false,
      feedback: {
        message: '',
        type: '',
      },
      rules: {
        required: (v) => !!v || 'This field is required.',
      },
      feedbackTypes: ['Bug Report', 'Feature Request', 'Other'],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.feedback = { message: '', type: '' };
      if (this.$refs.feedbackForm) {
        this.$refs.feedbackForm.resetValidation();
      }
    },
    submitFeedback() {
      if (this.$refs.feedbackForm.validate()) {
        // Track feedback submission only here
        posthog.capture('feedback_submitted', {
          feedback_message: this.feedback.message,
          feedback_type: this.feedback.type,
          user_id: this.$root.user ? this.$root.user.uid : 'guest',
          page_url: window.location.href,
          timestamp: new Date().toISOString(),
        });

        // Notify and reset form after submission
        alert('Thank you for your feedback!');
        this.closeDialog();
      } else {
        alert('Please fill in all required fields.');
      }
    },
  },
};
</script>
