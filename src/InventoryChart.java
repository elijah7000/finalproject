class InventoryChart{
        private String title;
        private int[] stats;

        public InventoryChart(String title, int[] stats) {
            this.title = title;
            this.stats = stats;
        }

        public String getTitle() {
            return title;
        }

        public int[] getStats() {
            return stats;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public void setStats(int[] stats) {
            this.stats = stats;
        }
        public void displayGraph() {
            // ...

        }
    }
