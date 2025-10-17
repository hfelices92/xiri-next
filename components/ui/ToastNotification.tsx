"use client"
import { ToastContainer } from "react-toastify"

export default function ToastNotification() {
  return (
    <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
  )
}
