import { timers } from "jquery"
import Swal from "sweetalert2"
export default class NotificationService {


  static async confirmAction(title = "Are you sure", text = "You won't be able to revert this!") {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'orange',
        confirmButtonText: 'Close!'
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {

    }
  }

  static toast(title = "Default Toast", time = 5000, icon = "info") {
    // @ts-ignore
    Swal.fire({
      title: title,
      icon: icon,
      iconHtml: `<img
        src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
        style="width: 50px"
        alt
      />`,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timerProgressBar: true
    })
  }
}