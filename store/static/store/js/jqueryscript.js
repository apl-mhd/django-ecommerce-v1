let checkArr = [];
let output = '';

//Tags section

$(document).on('click', '.tagclick', function () {
  $('.tagparent').remove();
  let a = $(this).attr('id');
  $(this).after(
    "<div class='tagparent'><input class='tagvalue' type='text' data-id='" +
      a +
      "'><input class='tagsave' type='submit' value='Save'/>  </div>"
  );
  console.log(a);
});
$(document).on('mouseleave', '.tagparent', function (event) {
  $(this).remove();
});
$(document).on('click', '.tagsave', function () {
  let tagName = $(this).parent().find('.tagvalue').val();
  let tagId = $(this).parent().find('.tagvalue').attr('data-id');
  $(this).parent().remove();

  output = '';

  //console.log(tagName, tagId);

  categoryData = { tagName: tagName, tagId: tagId };

  $.ajax({
    url: "{% url 'save-category' %}",
    method: 'POST',
    data: categoryData,
    success: function (data) {
      console.log(data);

      let tag = data.childTags;
      for (let i = 0; i < tag.length; i++) {
        output += `
           <div class="form-check">
                  <input
                    name="${tag[i].tag_name}"
                    onclick="clk()"
                    class="form-check-input chekbox"
                    type="checkbox"
                    value="${tag[i].id}"
                    id="${tag[i].tag_name}"
                  />
                  <label class="form-check-label" for="${tag[i].tag_name}">
                    ${tag[i].tag_name}
                  </label>
            </div>
          `;
      }

      $('#childtag').html(output);
      $('#replace').html(data.htmltag);
    },
  });
});

//End Tags section

//Form Clear
// function clearForm() {
//   $('form')[0].reset();
//   $('#checkbox-select').html('Tags: ');
//   $('input:checkbox').prop('checked', false);
//   checkArr = [];
// }

//note saved
// $('#btnsave').click(function () {
//   console.log('Save Button Clicked');
//   let title = $('#titleid').val();
//   let subject = $('#subjectid').val();
//   let csr = $('input[name=csrfmiddlewaretoken]').val();
//   checkArr = [];
//   $(':checkbox:checked').each(function () {
//     checkArr.push($(this).val());
//   });

//   let output = '';

//   //console.log(title);
//   //console.log(subject);
//   console.log('aa', checkArr);

//   noteData = {
//     title: title,
//     subject: subject,
//     'checkBox[]': checkArr,
//   };

//   $.ajax({
//     url: "{% url 'save' %}",
//     method: 'POST',
//     data: noteData,
//     success: function (data) {
//       console.log(data);
//       notes = data.notes;

//       if (data.status == 1) {
//         notes = data.notes;

//         for (let i = 0; i < notes.length; i++) {
//           output += '<h6>' + notes[i].note_title + '</h6> <hr/>';
//         }

//         $('#notetitle').html(output);
//         clearForm();
//       }
//     },
//   });
// });

//form clear
// $('#btnclear').click(function () {
//   clearForm();
//   //console.log($('input:checkbox'));
// });

//Check Box, display all checked tag under form
// $('input[type=checkbox]').click(function () {
//   checkArr = [];
//   let checkBoxOutput = 'Tags: ';

//   $(':checkbox:checked').each(function () {
//     checkBoxOutput += '<span>' + $(this).attr('name') + '</span> ';
//     checkArr.push($(this).val());
//   });

//   $('#checkbox-select').html(checkBoxOutput);
//   console.log(checkArr);
// });
