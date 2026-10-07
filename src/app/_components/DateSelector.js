"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from,
        end: range.to,
      }),
    )
  );
}

function DateSelector({ settings, room, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CHANGE

  const { regularPrice, discount } = room;

  const numNights =
    range?.from && range?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="grid min-h-0 min-w-0 grid-rows-[minmax(360px,1fr)_88px]">
      <DayPicker
        className="my-calendar w-full pt-6 px-8"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
        onSelect={setRange}
        selected={displayRange}
      />

      <div className="flex h-22 items-center justify-between bg-accent-500 px-10 text-primary-800">
        <div className="flex items-center gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>

                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}

            <span>/night</span>
          </p>

          {numNights ? (
            <>
              <p className="flex items-center gap-1 bg-accent-600 px-4 py-3 text-2xl">
                <span>&times;</span>
                <span>{numNights}</span>
              </p>

              <p className="flex items-baseline gap-2">
                <span className="text-sm font-bold uppercase">Total</span>

                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
