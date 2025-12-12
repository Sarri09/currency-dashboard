# Ria Money Transfer - Currency Exchange Dashboard

## Project Overview
This repository contains a Currency Exchange Dashboard. The application allows users to convert currencies in real-time and view live exchange rates for major global currencies, utilizing the Frankfurter API.

**Technical Stack:**
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** CSS Modules
* **Data Source:** Frankfurter API

## Features
1.  **Currency Converter:** Real-time conversion with bidirectional support.
2.  **Exchange Rates Dashboard:** Live overview of major currencies against a selected base.
3.  **Performance Optimization:** Implementation of a debounce pattern to minimize network requests.

## Getting Started

Follow these instructions to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sarri09/currency-dashboard.git
    cd currency-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## Innovation Feature: Bidirectional Swap Button

**Description**
I implemented a dedicated "Swap Currencies" button located between the "From" and "To" selectors.

**Reasoning**
When sending money internationally, users frequently need to calculate the inverse rate to compare costs (e.g., "How much do I get for 100 USD?" vs. "How many USD do I need to send to deliver 100 EUR?"). Manually re-selecting currencies in both dropdowns creates unnecessary friction in the user journey.

**User Experience Improvement**
This feature allows users to reverse the transaction flow with a single click, maintaining the context of the conversion and the input amount without resetting the form. This directly addresses the user's need for efficiency and quick comparison.

---

## AI Usage Statement

I utilized AI (Gemini) as a productivity tool to accelerate development, specifically for:

* **Component Structure:** 
    To maximize efficiency, I used AI to  Generate the initial HTML/CSS structures for forms to allow more focus on business logic.
* **Performance Optimization:**
    I identified that the real-time conversion flow would trigger excessive API requests on every keystroke. To prevent server flooding, I tasked the AI with implementing a **Debounce strategy** (using `setTimeout`), ensuring the application remains reactive while strictly respecting network limits.
* **Documentation:**
    I leveraged AI to refine the drafting of this README. I acted as the content author, providing the specific outlines, raw ideas, and reasoning (especially regarding the trade-offs and innovation logic), and tasked the AI with polishing the language and formatting. This ensured the final documentation adhered to professional standards while accurately reflecting my own technical decisions.
* **Quality Assurance Strategy:**
    I decided to use the AI to brainstorm a rigorous "creative testing" checklist, challenging the application with edge cases (such as network throttling and rapid typing) to ensure production-ready stability before deployment.

*Note: All architectural decisions and final code implementation were verified by me.*

---

## Assumptions and Trade-offs

### Requirement Interpretation (The "Display" Logic)
* **Real-time vs. On-click:** The instructions stated to *"Display the converted amount"* without explicitly requiring a "Submit" button. I interpreted this as an opportunity to implement a **real-time dynamic conversion**. I assumed that immediate visual feedback (as the user types) provides a more modern and fluid user experience than forcing an extra click, leading to the decision to remove the traditional "Calculate" button in favor of the debounced effect.
* **Performance Consideration:** I recognized that a dynamic flow inherently increases network traffic compared to a static button. To balance **Fluid UX** with **Network Efficiency**, I proactively implemented a **Debounce mechanism** (500ms delay). This ensures the application remains responsive without abusing API limits or flooding the server with unnecessary requests during rapid typing.

### API Usage
* **API Selection:** I used the `frankfurter.dev` API as requested. I assumed the `/latest` endpoint is sufficient for current rates.
* **Data Fetching:** For the "Exchange Rates Dashboard", I chose to separate the fetch logic from the converter logic. This follows the Separation of Concerns principle, ensuring that the dashboard logic remains independent of the transactional converter logic.

### Styling Strategy
* **CSS Modules:** Instead of using Tailwind CSS, I opted for plain CSS Modules. This was a deliberate trade-off to keep the project dependencies lightweight and to demonstrate a solid understanding of the CSS Box Model, Flexbox, and Grid layouts.

---

## Future Improvements

If more time were available, I would prioritize the following enhancements:

1.  **Historical Trends Visualization:**
    I would implement a line chart to visualize the exchange rate history over the last 30 days. This would involve fetching data from the time-series endpoint (`/start_date..end_date`) to help users make informed decisions based on market trends.

2.  **Unit Testing:**
    I would add unit tests using Jest and React Testing Library, specifically to verify the `convertCurrencyAmount` logic and ensure the UI gracefully handles API errors or network timeouts.