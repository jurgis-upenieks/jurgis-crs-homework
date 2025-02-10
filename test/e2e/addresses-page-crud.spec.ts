import {Builder, By, WebDriver} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import {expect} from 'chai';
import 'mocha';

let driver: WebDriver;

describe('Addresses page CRUD E2E Test', function () {
  this.timeout(30000);

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the home page and display expected content', async () => {
    const uniqueInputDataPostfix = ` ${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`;
    
    await driver.get('http://localhost:3000/');
    
    const heading = await driver.findElement(By.css('h1'));
    const headingText = await heading.getText();

    expect(headingText).to.contain('Jurgis CRS Homework');

    // Click the "Add Address" button:
    const addButton = await driver.findElement(By.id('QA_add_address_button'));
    await addButton.click();

    // Check that a new empty row has been added, by checking if there is a row, where Id cell is empty:
    const firstEmptyCell = await driver.findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_id']"));
    expect(await firstEmptyCell.getText()).to.equal('');

    // Find the parent element of the firstEmptyCell:
    const row = await firstEmptyCell.findElement(By.xpath('..'));

    // In that empty row fill in data cells:
    const addressInput = await row.findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_address']")).findElement(By.tagName('input'));
    expect(await addressInput.getAttribute('value')).to.equal('');
    await addressInput.sendKeys(`Test Address${uniqueInputDataPostfix}`);

    let countryInput = await row.findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_country']")).findElement(By.tagName('input'));
    expect(await countryInput.getAttribute('value')).to.equal('');
    await countryInput.sendKeys(`Test Country${uniqueInputDataPostfix}`);

    const zipInput = await row.findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_zip']")).findElement(By.tagName('input'));
    expect(await zipInput.getAttribute('value')).to.equal('');
    await zipInput.sendKeys(`Test Zip${uniqueInputDataPostfix}`);
    
    
    // Click "Save Changes" button to submit the new Address to back-end:
    let saveButton = await driver.findElement(By.id('QA_save_changes'));
    await saveButton.click();

    // Perform a hard refresh of the website:
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.executeScript('location.reload(true)');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Now check if the newly created row received the Id value (in Id column cell) from back-end:
    await driver.wait(async () =>
      parseInt(
        await driver.findElement(By.xpath(`//input[@value='Test Address${uniqueInputDataPostfix}']`))
          .findElement(By.xpath('../..'))
          .findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_id']"))
          .getText(), 10
      ) > 0, 10000
    );

    
    // Now check if saving after editing works:
    countryInput = await driver.findElement(By.xpath(`//input[@value='Test Country${uniqueInputDataPostfix}']`));
    await countryInput.clear();
    await countryInput.sendKeys(`New Test Country${uniqueInputDataPostfix}`);

    saveButton = await driver.findElement(By.id('QA_save_changes'));
    await saveButton.click();

    // Perform a hard refresh of the website:
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.executeScript('location.reload(true)');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Now check if saving after editing the Address cell worked:
    await driver.wait(async () => {
      try {
        const countryElement = await driver.findElement(By.css("td[id^='QA_data_row_'][id$='__data_cell_country']"));
        const inputElement = await countryElement.findElement(By.tagName('input'));
        const inputValue = await inputElement.getAttribute('value');
        return inputValue === `New Test Country${uniqueInputDataPostfix}`;
      } catch (err) {
        return false;
      }
    }, 10000);


    // Now check if the Address removal works:
    const removeAddressButton = await driver.findElement(By.xpath(`//input[@value='New Test Country${uniqueInputDataPostfix}']`))
      .findElement(By.xpath('../..'))
      .findElement(By.css("[id^='action_button_'][id$='_Delete']"));
    await removeAddressButton.click();

    // Click Yes in confirmation modal
    const yesButton = await driver.findElement(By.xpath("//button[text()='Yes']"));
    await yesButton.click();

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if the row with 'New Test Country' disappears:
    await driver.wait(async () => {
      try {
        await driver.findElement(By.xpath(`//input[@value='New Test Country${uniqueInputDataPostfix}']`));
        return false;
      } catch (err) {
        if (err instanceof Error && err.name === 'NoSuchElementError') {
          return true;
        }
        throw err;
      }
    }, 10000);

  });
});
