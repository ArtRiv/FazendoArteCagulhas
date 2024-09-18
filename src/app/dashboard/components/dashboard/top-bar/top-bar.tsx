import React from "react";
import { FiMoon, FiSun, FiSunrise, FiSunset } from "react-icons/fi";
import { SelectDatePeriod } from "./select";

export const TopBar = () => {

  const user = {
    email: "teste@teste.com.br",
    name: "Natália",
  }

  const message = getTopbarMessage(user.name);
  const { currentDay, translatedMonth, currentYear, currentWeekDay, partOfTheDay } = getTime();

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <div className="flex gap-2 items-center justify-center">
            {renderIcon(partOfTheDay)}
            <span className="text-sm font-bold block">{message}</span>
          </div>
          <span className="text-xs block text-stone-500">
            {currentWeekDay}, {translatedMonth} {currentDay} {currentYear}
          </span>
        </div>
        
        <SelectDatePeriod/>
      </div>
    </div>
  );
};

const { DateTime } = require('luxon');

const getPartOfDay = () => {
  const brasiliaTime = DateTime.now().setZone('America/Sao_Paulo');
  const currentHour = brasiliaTime.hour;

  let timeOfDay;

  if (currentHour >= 6 && currentHour < 12) {
    timeOfDay = 'Day';
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = 'Evening';
  } else if (currentHour >= 18 && currentHour < 24) {
    timeOfDay = 'Night';
  } else if (currentHour >= 0 && currentHour < 6) {
    timeOfDay = 'Dawn';
  } else {
    return undefined;
  };

  return timeOfDay;
}

const getTime = () => {
  const brasiliaTime = DateTime.now().setZone('America/Sao_Paulo');
  const currentDay: number = brasiliaTime.day;
  const currentMonth: number = brasiliaTime.month;
  const currentYear: number = brasiliaTime.year;
  const currentWeekDay: string = brasiliaTime.weekdayLong;

  let translatedMonth: string;

  switch (currentMonth) {
    case 1:
      translatedMonth = 'jan';
      break;
    case 2:
      translatedMonth = 'fev';
      break;
    case 3:
      translatedMonth = 'mar';
      break;
    case 4:
      translatedMonth = 'abr';
      break;
    case 5:
      translatedMonth = 'maio';
      break;
    case 6:
      translatedMonth = 'jun';
      break;
    case 7:
      translatedMonth = 'jul';
      break;
    case 8:
      translatedMonth = 'ago';
      break;
    case 9:
      translatedMonth = 'set';
      break;
    case 10:
      translatedMonth = 'out';
      break;
    case 11:
      translatedMonth = 'nov';
      break;
    case 12:
      translatedMonth = 'dez';
      break;
    default:
      translatedMonth = 'Invalid month';
  }

  const partOfTheDay = getPartOfDay();

  return {
    currentDay,
    translatedMonth,
    currentYear,
    currentWeekDay,
    partOfTheDay,
  };
};

const renderIcon = (partOfTheDay: string | undefined) => {
  switch (partOfTheDay) {
    case "Day":
      return <FiSun className="fill-yellow-500" />;
    case "Evening":
      return <FiSunset className="fill-orange-500" />;
    case "Night":
      return <FiMoon className="fill-purple-900" />;
    case "Dawn":
      return <FiSunrise className="fill-pink-500" />;
    default:
      return null;
  }
}

const getTopbarMessage = (name: string) => {
  const partOfTheDay = getPartOfDay();

  const morningMessage = `Bom dia, ${name}`;
  const eveningMessage = `Boa tarde, ${name}`;
  const nightMessage = `Boa noite, ${name}`;
  const dawnMessage = `zZzZzZzZ, ${name}`;
  const errorMessage = `Algo deu errado...`;

  if (!partOfTheDay) return errorMessage;

  switch (partOfTheDay) {
    case 'Day':
      return morningMessage;
    case 'Evening':
      return eveningMessage;
    case 'Night':
      return nightMessage;
    case 'Dawn':
      return dawnMessage;
    default:
      return errorMessage;
  }
}