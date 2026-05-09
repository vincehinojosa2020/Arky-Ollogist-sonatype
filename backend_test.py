import requests
import sys
from datetime import datetime
import json

class ArkyBookAPITester:
    def __init__(self, base_url="https://book-builder-7.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_base}/{endpoint}" if not endpoint.startswith('http') else endpoint
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        response_data = response.json()
                        print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    except:
                        print(f"   Response: {response.text[:200]}...")
                
                self.results.append({
                    "test": name,
                    "status": "PASSED",
                    "endpoint": endpoint,
                    "response_code": response.status_code
                })
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                
                self.results.append({
                    "test": name,
                    "status": "FAILED",
                    "endpoint": endpoint,
                    "expected_code": expected_status,
                    "actual_code": response.status_code,
                    "error": response.text[:200]
                })

            return success, response.json() if response.content and 'json' in response.headers.get('content-type', '') else response.text

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "status": "ERROR",
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_book_info(self):
        """Test book info endpoint"""
        return self.run_test(
            "Book Info",
            "GET",
            "book/info",
            200
        )

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "message": "This is a test message for Arky's book website"
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        test_data = {
            "email": f"newsletter{datetime.now().strftime('%H%M%S')}@example.com"
        }
        
        return self.run_test(
            "Newsletter Subscription",
            "POST",
            "newsletter/subscribe",
            200,
            data=test_data
        )

    def test_book_order(self):
        """Test book order creation"""
        test_data = {
            "name": f"Test Buyer {datetime.now().strftime('%H%M%S')}",
            "email": f"buyer{datetime.now().strftime('%H%M%S')}@example.com",
            "address": "123 Test Street",
            "city": "Test City",
            "state": "CA",
            "zip_code": "12345",
            "quantity": 1,
            "order_type": "paperback",
            "notes": "Test order for Arky book"
        }
        
        success, response = self.run_test(
            "Book Order Creation",
            "POST",
            "orders",
            200,
            data=test_data
        )
        
        # If successful, try to get the order
        if success and isinstance(response, dict) and 'id' in response:
            order_id = response['id']
            self.run_test(
                "Get Book Order",
                "GET",
                f"orders/{order_id}",
                200
            )
        
        return success, response

def main():
    print("🚀 Starting Arky Allogist Ant API Tests")
    print("=" * 50)
    
    tester = ArkyBookAPITester()
    
    # Core API tests
    print("\n📋 Testing Core API Endpoints:")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    tester.test_book_info()
    
    # Contact form tests
    print("\n📧 Testing Contact & Communication:")
    tester.test_contact_form()
    tester.test_newsletter_subscription()
    
    # Order system tests
    print("\n📚 Testing Book Order System:")
    tester.test_book_order()
    
    # List all available endpoints
    print("\n🔍 Testing Get Endpoints:")
    tester.run_test("Get Contact Messages", "GET", "contact", 200)
    tester.run_test("Get Newsletter Subscribers", "GET", "newsletter/subscribers", 200)
    tester.run_test("Get Book Orders", "GET", "orders", 200)
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed != tester.tests_run:
        print("\n❌ Failed Tests:")
        for result in tester.results:
            if result['status'] in ['FAILED', 'ERROR']:
                print(f"   - {result['test']}: {result.get('error', 'Status code mismatch')}")
    
    print("\n✅ Backend API testing completed!")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())