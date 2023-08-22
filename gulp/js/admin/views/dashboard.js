app.views.AdminDashboard = app.views.Base.extend({

  className: 'dashboard',

  template: _.template(TEMPLATES['admin_dashboard.ejs']),

  initialize: function(data){
    // preserve whatever stuff was in data var to new {}
    this.data = _.extend({}, data);

    // get from api
    // this.loadData()
    this.data.userData = JSON.parse($.ajax({async: false, method: "GET", url: "/user_data.json"}).responseText).data

    this.data.transcriptsCompletedData = JSON.parse($.ajax({async: false, method: "GET", url: "/transcripts_completed_data.json"}).responseText).data

    this.data.editActivity = JSON.parse($.ajax({async: false, method: "GET", url: "/edit_activity_data.json"}).responseText).data

    this.render()

  },

  // loadData: function(){
  //   var _this = this;
  //   console.log( 'I do !' )
  //   $.get("/user_data.json", function(userData) {
  //     console.log( 'user user', userData )
  //     // _this.parseData(data.stats);
  //     _this.data.userData = userData

  //   });
  // },

  // parseData: function(stats){
  //   var day = 24 * 60 * 60 * 1000;

  //   _.each(stats, function(stat, i){
  //     var data = _.map(stat.data, function(row){
  //       row.date = Date.parse(row.date);
  //       return row;
  //     });

  //     var sums = [];

  //     // All time
  //     sums.push({
  //       label: 'All Time',
  //       value: _.reduce(data, function(memo, stat){ return memo + stat.count; }, 0)
  //     });

  //     // Past 30 days
  //     var thirty_days_ago = new Date().getTime() - 30 * day;
  //     data = _.filter(data, function(stat){ return stat.date > thirty_days_ago; });
  //     sums.push({
  //       label: 'Past 30 days',
  //       value: _.reduce(data, function(memo, stat){ return memo + stat.count; }, 0)
  //     });

  //     // Past 7 days
  //     var seven_days_ago = new Date().getTime() - 7 * day;
  //     data = _.filter(data, function(stat){ return stat.date > seven_days_ago; });
  //     sums.push({
  //       label: 'Past 7 days',
  //       value: _.reduce(data, function(memo, stat){ return memo + stat.count; }, 0)
  //     });

  //     // Past 24 hours
  //     var one_day_ago = new Date().getTime() - day;
  //     data = _.filter(data, function(stat){ return stat.date > one_day_ago; });
  //     sums.push({
  //       label: 'Past 24 hours',
  //       value: _.reduce(data, function(memo, stat){ return memo + stat.count; }, 0)
  //     });

  //     // add sums to stats
  //     stats[i]['sums'] = sums;
  //   });

  //   this.data.stats = stats;
  //   // console.log(stats);
  //   this.render();
  // },

  render: function() {
    this.$el.html(this.template(this.data));

    return this;
  }

});
