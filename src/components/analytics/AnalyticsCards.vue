<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card>
        <v-card-title class="text-subtitle-2 pb-0">Sessions</v-card-title>
        <v-card-text>
          <div>
            <div class="d-flex justify-space-between align-center">
              <div class="text-h5 font-weight-black">24k</div>
              <v-avatar color="secondary" variant="tonal" size="48">
                <v-icon icon="mdi-cube-outline" color="secondary"></v-icon>
              </v-avatar>
            </div>
            <div class="mt-2 pt-3 border-top">
              <span class="text-success font-weight-medium">8.5%</span>
              <span class="text-medium-emphasis"> New Sessions Today</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="4">
      <v-card>
        <v-card-title class="text-subtitle-2 pb-0">Avg.Sessions</v-card-title>
        <v-card-text>
          <div>
            <div class="d-flex justify-space-between align-center">
              <div class="text-h5 font-weight-black">00:18</div>
              <v-avatar color="secondary" variant="tonal" size="48">
                <v-icon icon="mdi-clock-outline" color="secondary"></v-icon>
              </v-avatar>
            </div>
            <div class="mt-2 pt-3 border-top">
              <span class="text-success font-weight-medium">1.5%</span>
              <span class="text-medium-emphasis"> Weekly Avg.Sessions</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="4">
      <v-card>
        <v-card-title class="text-subtitle-2 pb-0">Bounce Rate</v-card-title>
        <v-card-text>
          <div>
            <div class="d-flex justify-space-between align-center">
              <div class="text-h5 font-weight-black">36.45%</div>
              <v-avatar color="secondary" variant="tonal" size="48">
                <v-icon icon="mdi-trending-up" color="secondary"></v-icon>
              </v-avatar>
            </div>
            <div class="mt-2 pt-3 border-top">
              <span class="text-error font-weight-medium">8%</span>
              <span class="text-medium-emphasis"> Up Bounce Rate Weekly</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.border-top {
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
  margin: 0 -16px;
  padding: 0 16px;
}
</style>
