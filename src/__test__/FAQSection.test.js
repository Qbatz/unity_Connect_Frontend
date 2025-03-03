import { render, screen } from "@testing-library/react";
import FAQSection from "../Component/LandingPage/FAQSection";
import userEvent from "@testing-library/user-event";


describe('it should render faq sections', () => {
    
    it('it should check for render UI ', () => {
        render(<FAQSection />)

        expect(screen.getByTestId('get-answer-container')).toBeInTheDocument();
        const buttonToggleFaq = screen.getByTestId('button-toggle-faq-0');
        expect(buttonToggleFaq).toBeInTheDocument();
        userEvent.click(buttonToggleFaq)
        const answerDiv = screen.getByTestId('div-answers')
        expect(answerDiv).toBeInTheDocument()
        userEvent.click(buttonToggleFaq)
        expect(answerDiv).not.toBeInTheDocument()
    })

})