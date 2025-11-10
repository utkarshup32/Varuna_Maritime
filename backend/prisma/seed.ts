import { PrismaClient } from "@prisma/client";

const databaseClient = new PrismaClient();

interface RouteData {
  vesselId: string;
  routeName: string;
  distanceInNauticalMiles: number;
  departureDate: Date;
  arrivalDate: Date;
  routeStatus: "COMPLETED";
  routeSegments: { origin: string; destination: string; distanceKm: number };
}

const routeEntries: RouteData[] = [
  {
    vesselId: "V001",
    routeName: "Mumbai–Goa",
    distanceInNauticalMiles: 318.57,
    departureDate: new Date("2024-01-01"),
    arrivalDate: new Date("2024-01-05"),
    routeStatus: "COMPLETED",
    routeSegments: { origin: "Mumbai", destination: "Goa", distanceKm: 590 },
  },
  {
    vesselId: "V002",
    routeName: "Kolkata–Chennai",
    distanceInNauticalMiles: 901.3,
    departureDate: new Date("2024-02-01"),
    arrivalDate: new Date("2024-02-10"),
    routeStatus: "COMPLETED",
    routeSegments: {
      origin: "Kolkata",
      destination: "Chennai",
      distanceKm: 1670,
    },
  },
  {
    vesselId: "V003",
    routeName: "Delhi–Jaipur",
    distanceInNauticalMiles: 151.19,
    departureDate: new Date("2024-03-01"),
    arrivalDate: new Date("2024-03-02"),
    routeStatus: "COMPLETED",
    routeSegments: { origin: "Delhi", destination: "Jaipur", distanceKm: 280 },
  },
];

async function seedDatabase() {
  try {
    const routeRecords = routeEntries.map((entry) => ({
      vesselId: entry.vesselId,
      name: entry.routeName,
      totalDistanceNauticalMiles: entry.distanceInNauticalMiles,
      startDate: entry.departureDate,
      endDate: entry.arrivalDate,
      status: entry.routeStatus,
      segments: entry.routeSegments,
    }));

    await databaseClient.routes.createMany({
      data: routeRecords,
      skipDuplicates: true,
    });

    console.log("Seeded routes");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seedDatabase()
  .catch((error) => {
    console.error("Seed operation failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await databaseClient.$disconnect();
  });
