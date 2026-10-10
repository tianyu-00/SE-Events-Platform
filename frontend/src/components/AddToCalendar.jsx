import React from "react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Modal from "./Modal";
import { SiGooglecalendar } from "react-icons/si";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";
import { FaYahoo, FaMicrosoft } from "react-icons/fa";
import { TiCalendar } from "react-icons/ti";

function AddToCalendar({ eventData, isOpen, onClose }) {
  const event = {
    title: eventData.event_name,
    description: eventData.event_description,
    start: eventData.event_start_date,
    end: eventData.event_end_date,
    location: `${eventData.event_street_address}, ${eventData.event_city_town}, ${eventData.event_postcode}`,
  };

  const openCalendar = (getUrl) => {
    const url = getUrl(event);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const downloadCalendar = () => {
    const calendarData = ics(event);
    const blob = new Blob([calendarData], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "event.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="Add To Calendar">
      <div className="flex flex-col space-y-4 p-4 max-w-96">
        <h2>
          Add <span className="font-semibold">{eventData.event_name}</span> to calendar
        </h2>

        <button
          type="button"
          onClick={() => openCalendar(google)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <SiGooglecalendar size={20} />
          <span className="font-semibold">Google Calendar</span>
        </button>

        <button
          type="button"
          onClick={() => openCalendar(outlook)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <PiMicrosoftOutlookLogoBold size={20} />
          <span className="font-semibold">Outlook</span>
        </button>

        <button
          type="button"
          onClick={() => openCalendar(office365)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <FaMicrosoft size={20} />
          <span className="font-semibold">Office 365</span>
        </button>

        <button
          type="button"
          onClick={() => openCalendar(yahoo)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <FaYahoo size={20} />
          <span className="font-semibold">Yahoo Calendar</span>
        </button>

        <button
          type="button"
          onClick={downloadCalendar}
          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <TiCalendar size={20} />
          <span className="font-semibold">Download ICS file</span>
        </button>
      </div>
    </Modal>
  );
}

export default AddToCalendar;
