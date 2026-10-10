import React, { useMemo } from "react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Modal from "./Modal";
import { SiGooglecalendar } from "react-icons/si";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";
import { FaYahoo, FaMicrosoft } from "react-icons/fa";
import { TiCalendar } from "react-icons/ti";

function AddToCalendar({ eventData, isOpen, onClose }) {
  const event = useMemo(
    () => ({
      title: eventData.event_name,
      description: eventData.event_description,
      start: eventData.event_start_date,
      end: eventData.event_end_date,
      location: [eventData.event_street_address, eventData.event_city_town, eventData.event_postcode]
        .filter(Boolean)
        .join(", "),
    }),
    [eventData],
  );

  const links = useMemo(() => {
    try {
      return [
        {
          label: "Google Calendar",
          href: google(event),
          Icon: SiGooglecalendar,
          color: "bg-blue-600 hover:bg-blue-700",
        },
        {
          label: "Outlook",
          href: outlook(event),
          Icon: PiMicrosoftOutlookLogoBold,
          color: "bg-blue-600 hover:bg-blue-700",
        },
        {
          label: "Office 365",
          href: office365(event),
          Icon: FaMicrosoft,
          color: "bg-blue-600 hover:bg-blue-700",
        },
        {
          label: "Yahoo Calendar",
          href: yahoo(event),
          Icon: FaYahoo,
          color: "bg-purple-600 hover:bg-purple-700",
        },
      ];
    } catch (err) {
      console.error("Failed to build calendar links:", err);
      return [];
    }
  }, [event]);

  const downloadCalendar = () => {
    try {
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
    } catch (err) {
      console.error("Failed to download ICS file:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="Add To Calendar">
      <div className="flex flex-col space-y-4 p-4 max-w-96">
        <h2>
          Add <span className="font-semibold">{eventData.event_name}</span> to calendar
        </h2>

        {links.map(({ label, href, Icon, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} text-white p-3 rounded-md flex items-center space-x-2 transition duration-200`}
          >
            <Icon size={20} />
            <span className="font-semibold">{label}</span>
          </a>
        ))}

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
