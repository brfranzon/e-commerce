$(function () {
  if ($("textarea#ta").length) {
    CKEDITOR.replace("ta");
  }

  $("a.confirmDelete").on("click", (e) => {
    if (!confirm("Confirm deletion"))
      return false;

  })
})

