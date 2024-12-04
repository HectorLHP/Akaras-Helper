<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Submit Feedback</v-card-title>
      <v-card-text>
        <v-form ref="feedbackForm" v-model="valid">
          <v-textarea
            v-model="feedback.message"
            label="Your Feedback"
            :rules="[rules.required]"
            outlined
            required
          ></v-textarea>
          <v-select
            v-model="feedback.type"
            :items="['Bug Report', 'Feature Request', 'Other']"
            label="Type"
            :rules="[rules.required]"
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitFeedback" :disabled="!valid">
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
      valid: false,
      feedback: {
        message: '',
        type: '',
      },
      rules: {
        required: (v) => !!v || 'This field is required.',
      },
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
      this.feedback.message = '';
      this.feedback.type = '';
      this.$refs.feedbackForm.resetValidation();
    },
    submitFeedback() {
      if (this.$refs.feedbackForm.validate()) {
        console.log('Feedback submitted:', this.feedback);

        // Track the feedback submission in PostHog
        posthog.capture('feedback_submitted', {
          feedback_message: this.feedback.message,
          feedback_type: this.feedback.type,
          user_id: this.$root.user ? this.$root.user.uid : 'guest',
          page_url: window.location.href,
        });

        // Notify the user of successful submission
        alert('Thank you for your feedback!');

        // Close the dialog and reset form
        this.$nextTick(() => {
          this.dialog = false;
          this.resetForm();
        });
      } else {
        alert('Please fill in all required fields.');
      }
    },
  },
};
</script>
