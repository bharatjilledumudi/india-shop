Template.post_item.helpers({
  summary: function () {
    return Telescope.utils.trimWords(this.htmlBody, 20);
  },
  title: function () {
    return Telescope.utils.trimWords(this.title, 10);
  }
});
